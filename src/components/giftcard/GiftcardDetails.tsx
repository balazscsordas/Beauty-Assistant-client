import { Box, Collapse, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import axios from "axios";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GiftcardContext from "../../context/GiftcardProvider";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import { Alert } from "../smallComponents/Alerts";
import { AddIconPrimaryButton, BasicPrimaryButton, BasicSecondaryButton } from "../smallComponents/Buttons";
import DeleteDialog from "../smallComponents/DeleteDialog";
import { OneLineReqAutoFocusInput, OneLineReqInput } from "../smallComponents/InputFields";
import DatePickerDialog from "./DateDialog/DatePickerDialog";
import { containsOnlyNumbers } from "./DateDialog/Utils";
import DatePicker from "./DatePicker";

const GiftcardDetails = ({ _id, identifier, amount, startDate, endDate  }: GiftcardInterface) => {
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
        _id: _id,
        identifier: identifier,
        amount: amount,
        startDate: startDate,
        endDate: endDate,
    })

    const [showAmountError, setShowAmountError] = useState(false);

    useEffect(() => {
        setGiftcardStartDate(startDate);
        setGiftcardEndDate(endDate);
    }, [startDate, endDate])

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showAmountError) {
            modifyGiftcard(inputData);
        }
    }

    const modifyGiftcard = async (newGiftcardData: GiftcardInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/giftcard/edit-giftcard";
            const params = {newGiftcardData: newGiftcardData};
            const response = await axios.put(url, params, { withCredentials: true });
            if (response.status == 200) {
                setShowSuccessAlert(true);
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

    const deleteGiftcard = () => {
        console.log("ja");
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
                text="Ajándékutalvány módosítása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Ajándékutalvány módosítása nem sikerült."
                severity="error"
            />
            
            <>
                <h1 className="page-title">Ajándékutalvány hozzáadása</h1>
                <Box className="form" component="form" onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <OneLineReqAutoFocusInput value={inputData.identifier} label="Azonosító" nameVal="identifier"/>
                            </Col>
                            <Col lg={3}>
                                <OneLineReqInput value={inputData.amount} onChange={handleChange} label="Összeg" nameVal="amount" />
                                <Collapse in={showAmountError}>
                                    <p className="input-error-text">Kizárólag számot tartalmazhat!</p>
                                </Collapse>
                            </Col>
                            <Col lg={3}>
                                <DatePicker label="Érvényesség kezdete" giftcardDate={giftcardStartDate} setShowDateDialog={setShowStartDateDialog}/>
                            </Col>
                            <Col lg={3}>
                                <DatePicker label="Érvényesség Vége" giftcardDate={giftcardEndDate} setShowDateDialog={setShowEndDateDialog}/>
                            </Col>
                        </Row>
                    </Container>
                    <DeleteDialog 
                        deleteLabel={`Biztosan törölni szeretnéd ${identifier} azonosítójú ajándékutalványt?`}
                        deleteFunction={deleteGiftcard}
                    />
                </Box>
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

export default GiftcardDetails;