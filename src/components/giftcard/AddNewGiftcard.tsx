import React, { useContext, useEffect, useState } from "react";
import { Box } from '@mui/material';
import axios from "axios";
import Router from 'next/router';
import { Alert } from "../smallComponents/Alerts";
import { OneLineReqInputWithAdornment, OneLineReqInput } from "../smallComponents/InputFields";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import DatePicker from "./DatePicker";
import GiftcardContext from "../../context/GiftcardProvider";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import DatePickerDialog from "./DateDialog/DatePickerDialog";
import { containsOnlyNumbers, generateRandomIdentifier } from "./Utils";
import DetailsWrapper from "../smallComponents/sectionWrappers/DetailsWrapper";
import { checkIfDateInPast } from "../smallComponents/InputValidators";
import LangContext from "../../context/LanguageProvider";

const AddGiftcard = () => {

    const { lang } = useContext(LangContext);
    const { 
        giftcardStartDate,
        setGiftcardStartDate,
        giftcardEndDate,
        setGiftcardEndDate,
        showStartDateDialog,
        setShowStartDateDialog,
        showEndDateDialog,
        setShowEndDateDialog 
    } = useContext(GiftcardContext);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [inputData, setInputData] = useState<GiftcardInterface>({
        status: "pending",
        identifier: "",
        amount: "",
        startDate: giftcardStartDate,
        endDate: giftcardEndDate,
    })

    const [showIdentifierError, setShowIndentifierError] = useState(false);
    const [showAmountError, setShowAmountError] = useState(false);
    const [showEndDateError, setShowEndDateError] = useState(false);
    const [showStartDateError, setShowStartDateError] = useState(false);

 
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showIdentifierError && !showAmountError && !showEndDateError && !showStartDateError) {
            addNewGiftcardToDatabase(inputData);
            setInputData({
                status: "pending",
                identifier: "",
                amount: "",
                startDate: giftcardStartDate,
                endDate: giftcardEndDate,
            });
        }
    }

    const addNewGiftcardToDatabase = async (giftcardData: GiftcardInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/giftcard/add-new-giftcard";
            const params = {giftcardData: giftcardData};
            const response = await axios.post(url, params, { withCredentials: true });
            if (response.status == 201) {
                setShowSuccessAlert(true);
                Router.push('/admin/giftcards');
            } else {
                setShowErrorAlert(true);
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
            setShowErrorAlert(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prevVal => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
        if (name === 'amount') {
            containsOnlyNumbers(value) ? setShowAmountError(false) : setShowAmountError(true);
        }
        if (name === 'identifier') {
            containsOnlyNumbers(value) ? setShowIndentifierError(false) : setShowIndentifierError(true);
        }
    }

    useEffect(() => {
        setInputData(prevValues => {
            return {
                ...prevValues,
                startDate: giftcardStartDate,
            }
        });
        if (checkIfDateInPast(giftcardStartDate) && !showStartDateDialog) {
            setShowStartDateError(true);
        } else if (!checkIfDateInPast(giftcardStartDate) && !showStartDateDialog) {
            setShowStartDateError(false);
        }
    }, [giftcardStartDate])

    useEffect(() => {
        setInputData(prevValues => {
            return {
                ...prevValues,
                endDate: giftcardEndDate,
            }
        })
        if (checkIfDateInPast(giftcardEndDate) && !showEndDateDialog) {
            setShowEndDateError(true);
        } else if (!checkIfDateInPast(giftcardEndDate) && !showEndDateDialog) {
            setShowEndDateError(false);
        }
    }, [giftcardEndDate])

    const setNewIdentifier = () => {
        const newIdentifier = generateRandomIdentifier();
        setInputData(prevVal => {
            return {
                ...prevVal,
                identifier: newIdentifier,
            }
        })
        
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };


    return (
        <section id="add-new-client-section">
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text="Ajándékutalvány hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Ajándékutalvány hozzáadása nem sikerült."
                severity="error"
            />
            
            <>
                <h1 className="page-title">{ lang === 'hun' ? 'Ajándékutalvány hozzáadása' : 'Add new giftcard' }</h1>
                <DetailsWrapper>
                    <Box component="form" onSubmit={handleSubmit}>
                        <section className="flex flex-col lg:flex-row">
                            <div className="flex-1 mx-2">
                                <OneLineReqInputWithAdornment 
                                    value={inputData.identifier} 
                                    onChange={handleChange} 
                                    label={ lang === 'hun' ? 'Azonosító' : 'ID' } 
                                    nameVal="identifier" onClick={setNewIdentifier} 
                                    showError={showIdentifierError} 
                                    errorText={ lang === 'hun' ? "Kizárólag számot tartalmazhat!" : 'Only numbers are allowed!' }/>
                            </div>
                            <div className="flex-1 mx-2">
                                <OneLineReqInput 
                                    value={inputData.amount} 
                                    onChange={handleChange} 
                                    label={ lang === 'hun' ? "Összeg (Ft)" : 'Price (Eur)' } 
                                    nameVal="amount" 
                                    showError={showAmountError} 
                                    errorText={ lang === 'hun' ? "Kizárólag számot tartalmazhat!" : 'Only numbers are allowed!' }/>
                            </div>
                            <div className="flex-1 mx-2">
                                <DatePicker 
                                    label={ lang === 'hun' ? "Érvényesség kezdete" : "Valid from" }
                                    giftcardDate={giftcardStartDate} 
                                    setShowDateDialog={setShowStartDateDialog}
                                    showError={showStartDateError}
                                />
                            </div>
                            <div className="flex-1 mx-2">
                                <DatePicker 
                                    label={ lang === 'hun' ? "Érvényesség vége" : "Valid to" }
                                    giftcardDate={giftcardEndDate} 
                                    setShowDateDialog={setShowEndDateDialog}
                                    showError={showEndDateError}
                                />
                            </div>
                        </section>
                        <div className="text-center m-4">
                            <AddIconPrimaryButton text={ lang === 'hun' ? 'Ajándékutalvány hozzáadása' : "create giftcard" } type="submit"/>
                        </div>
                    </Box>
                </DetailsWrapper>
            </>
            <DatePickerDialog 
                label={ lang === 'hun' ? "Érvényesség kezdete" : "Valid from" }
                showDateDialog={showStartDateDialog} 
                setShowDateDialog={setShowStartDateDialog} 
                setGiftcardDate={setGiftcardStartDate}
                giftcardDate={giftcardStartDate}
            />
            <DatePickerDialog 
                label={ lang === 'hun' ? "Érvényesség vége" : "Valid to" }
                showDateDialog={showEndDateDialog} 
                setShowDateDialog={setShowEndDateDialog} 
                setGiftcardDate={setGiftcardEndDate}
                giftcardDate={giftcardEndDate}
            />
        </section>
    )
}

export default AddGiftcard;