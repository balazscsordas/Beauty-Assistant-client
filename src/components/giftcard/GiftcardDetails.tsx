import { Box } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import GiftcardContext from "../../context/GiftcardProvider";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import { Alert } from "../smallComponents/Alerts";
import DeleteDialog from "../smallComponents/DeleteDialog";
import { OneLineReqInput, SelectInputFieldGiftcard } from "../smallComponents/InputFields";
import DatePickerDialog from "./DateDialog/DatePickerDialog";
import { containsOnlyNumbers } from "./Utils";
import DatePicker from "./DatePicker";
import Router from "next/router";
import DetailsWrapper from "../smallComponents/sectionWrappers/DetailsWrapper";

const GiftcardDetails = ({ _id, status, identifier, amount, startDate, endDate  }: GiftcardInterface) => {

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
    const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
    const [showEditErrorAlert, setShowEditErrorAlert] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [inputData, setInputData] = useState<GiftcardInterface>({
        _id: _id,
        status: status,
        identifier: identifier,
        amount: amount,
        startDate: startDate,
        endDate: endDate,
    })
    const [showAmountError, setShowAmountError] = useState(false);

    useEffect(() => {
        setGiftcardStartDate(startDate);
        setGiftcardEndDate(endDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    
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

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showAmountError) {
            editGiftcardAPI(inputData);
        }
    }

    const deleteGiftcard = () => {
        _id && deleteGiftcardAPI(_id);
        Router.push('/admin/giftcards');
    }

    

    // API
    const editGiftcardAPI = async (newGiftcardData: GiftcardInterface) => {
      try {
          const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/giftcard/edit-giftcard";
          const params = {newGiftcardData: newGiftcardData};
          const response = await axios.put(url, params, { withCredentials: true });
          if (response.status == 200) {
              setShowEditSuccessAlert(true);
              Router.push('/admin/giftcards');
          } else {
              setShowEditErrorAlert(true);
          }
      }
      catch (err) {
          err instanceof Error && console.log(err.message);
          setShowEditErrorAlert(true);
      }
    }

    const deleteGiftcardAPI = async (giftcardId: string) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/giftcard/delete-giftcard";
            const config = {
                withCredentials: true,
                data: { giftcardId },
            }
            const response = await axios.delete(url, config);
            if (response.status == 200) {
                setShowDeleteSuccessAlert(true);
            } else {
                setShowDeleteErrorAlert(true);
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
            setShowDeleteErrorAlert(true);
        }
    }


    return (
        <section id="data-details-section">
            <Alert 
                open={showEditSuccessAlert}
                onClose={() => setShowEditSuccessAlert(false)}
                text="Aj??nd??kutalv??ny m??dos??t??sa sikeres volt."
                severity="success"
            />
            <Alert 
                open={showEditErrorAlert}
                onClose={() => setShowEditErrorAlert(false)}
                text="Aj??nd??kutalv??ny m??dos??t??sa nem siker??lt."
                severity="error"
            />
            <Alert 
                open={showDeleteSuccessAlert}
                onClose={() => setShowDeleteSuccessAlert(false)}
                text="Aj??nd??kutalv??ny t??rl??se sikeres volt."
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={() => setShowDeleteErrorAlert(false)}
                text="Aj??nd??kutalv??ny t??rl??se nem siker??lt."
                severity="error"
            />
            
            <>
                <h1 className="page-title">Aj??nd??kutalv??ny</h1>
                <DetailsWrapper>
                    <Box component="form" onSubmit={handleSubmit}>
                        <section className="flex flex-col lg:flex-row">
                            <div className="flex-1 mx-2">
                                <OneLineReqInput value={inputData.identifier} label="Azonos??t??" nameVal="identifier"/>
                            </div>
                            <div className="flex-1 mx-2">
                                <OneLineReqInput value={inputData.amount} onChange={handleChange} label="??sszeg" nameVal="amount" showError={showAmountError} errorText="Kiz??r??lag sz??mot tartalmazhat!"/>
                            </div>
                            <div className="flex-1 mx-2">
                                <DatePicker label="??rv??nyess??g kezdete" giftcardDate={giftcardStartDate} setShowDateDialog={setShowStartDateDialog}/>
                            </div>
                            <div className="flex-1 mx-2">
                                <DatePicker label="??rv??nyess??g v??ge" giftcardDate={giftcardEndDate} setShowDateDialog={setShowEndDateDialog}/>
                            </div>
                            <div className="flex-1 mx-2">
                                <SelectInputFieldGiftcard label="St??tusz" nameVal="status" setInputData={setInputData} value={inputData.status}/>
                            </div>
                        </section>
                        <DeleteDialog 
                            deleteLabel={`Biztosan t??r??lni szeretn??d ${identifier} azonos??t??j?? aj??nd??kutalv??nyt?`}
                            deleteFunction={deleteGiftcard}
                        />
                    </Box>
                </DetailsWrapper>
            </>
            <DatePickerDialog 
                label="??rv??nyess??g kezdete" 
                showDateDialog={showStartDateDialog} 
                setShowDateDialog={setShowStartDateDialog} 
                setGiftcardDate={setGiftcardStartDate}
                giftcardDate={giftcardStartDate}
            />
            <DatePickerDialog 
                label="??rv??nyess??g v??ge" 
                showDateDialog={showEndDateDialog} 
                setShowDateDialog={setShowEndDateDialog} 
                setGiftcardDate={setGiftcardEndDate}
                giftcardDate={giftcardEndDate}
            />
        </section>
    )
}

export default GiftcardDetails;