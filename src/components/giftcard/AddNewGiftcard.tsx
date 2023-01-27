import React, { useContext, useEffect, useState } from "react";
import { Collapse, Box } from '@mui/material';
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

const AddGiftcard = () => {

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

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showIdentifierError && !showAmountError) {
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
        })
    }, [giftcardStartDate])

    useEffect(() => {
        setInputData(prevValues => {
            return {
                ...prevValues,
                endDate: giftcardEndDate,
            }
        })
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
                <h1 className="page-title">Ajándékutalvány hozzáadása</h1>
                <DetailsWrapper>
                    <Box component="form" onSubmit={handleSubmit}>
                        <section className="flex flex-col lg:flex-row">
                            <div className="flex-1 mx-2">
                                <OneLineReqInputWithAdornment value={inputData.identifier} onChange={handleChange} label="Azonosító" nameVal="identifier" onClick={setNewIdentifier}/>
                                <Collapse in={showIdentifierError}>
                                    <p className="input-error-text">Kizárólag számot tartalmazhat!</p>
                                </Collapse>
                            </div>
                            <div className="flex-1 mx-2">
                                <OneLineReqInput value={inputData.amount} onChange={handleChange} label="Összeg (Ft)" nameVal="amount" />
                                <Collapse in={showAmountError}>
                                    <p className="input-error-text">Kizárólag számot tartalmazhat!</p>
                                </Collapse>
                            </div>
                            <div className="flex-1 mx-2">
                                <DatePicker label="Érvényesség kezdete" giftcardDate={giftcardStartDate} setShowDateDialog={setShowStartDateDialog}/>
                            </div>
                            <div className="flex-1 mx-2">
                                <DatePicker label="Érvényesség vége" giftcardDate={giftcardEndDate} setShowDateDialog={setShowEndDateDialog}/>
                            </div>
                        </section>
                        <div className="text-center m-4">
                            <AddIconPrimaryButton text='Ajándékutalvány hozzáadása' type="submit"/>
                        </div>
                    </Box>
                </DetailsWrapper>
            </>
            <DatePickerDialog 
                label="Érvényesség kezdete" 
                showDateDialog={showStartDateDialog} 
                setShowDateDialog={setShowStartDateDialog} 
                setGiftcardDate={setGiftcardStartDate}
                giftcardDate={giftcardStartDate}
            />
            <DatePickerDialog 
                label="Érvényesség vége" 
                showDateDialog={showEndDateDialog} 
                setShowDateDialog={setShowEndDateDialog} 
                setGiftcardDate={setGiftcardEndDate}
                giftcardDate={giftcardEndDate}
            />
        </section>
    )
}

export default AddGiftcard;