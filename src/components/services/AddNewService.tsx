import React, { useState, useRef, useContext } from "react";
import Container from 'react-bootstrap/Container';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import AuthContext from "../../context/AuthProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const AddClients = () => {

    // States + Refs
    const [showAlert, setShowAlert] = useState(false);
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const allergiesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const injuriesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const basicInformationRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [inputData, setInputData] = useState({
        name: "",
        age: ""
    })

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newClient: ClientWithoutId = {
            name: nameRef.current.value,
            age: inputData.age,
            basicInformation: basicInformationRef.current.value,
            allergies: allergiesRef.current.value,
            injuries: injuriesRef.current.value
        }
        nameRef.current.value = "";
        setInputData({
            name: "",
            age: ""
        })
        basicInformationRef.current.value = "";
        allergiesRef.current.value = "";
        injuriesRef.current.value = "";
        setShowAlert(true);
    }

    const addNewClientToDatabase = async (data: ClientWithoutId) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/trainer-app/add-new-client";
            const params = {clientData: data};
            const response = await axios.post(url, params);
            const _id: string = response.data._id;
            console.log(response.data.message);
            const newClientWithId: Clients = {
                _id: _id,
                name: data.name,
                age: data.age,
                basicInformation: data.basicInformation,
                allergies: data.allergies,
                injuries: data.injuries
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
        }
    }

    const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if(!value || ( value[value.length-1].match('[0-9]') && value[0].match('[1-9]'))) {
            if (value.length < 3) {
                setInputData(prevData => {
                    return {
                        ...prevData,
                        [name]: value
                    }
                })
            }
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    return (
        <section id="add-new-client-section">
            <Snackbar 
                open={showAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseAlert}
                >
                <MuiAlert 
                    onClose={handleCloseAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    New client has been added!
                </MuiAlert>
            </Snackbar>

            <Container>
                    <h1 className="section-title">Szolgáltatás hozzáadása</h1>
                    <Box className="form" component="form" onSubmit={handleSubmit}>
                        <div className="form-header">
                            <TextField
                                margin="normal"
                                required
                                inputRef={nameRef}
                                id="name"
                                label="Név"
                                name="name"
                                autoFocus
                            />
                            <TextField
                                className="age-input"
                                margin="normal"
                                required
                                onChange={changeInputData}
                                value={inputData.age}
                                id="age"
                                label="Kor"
                                name="age"
                            />
                        </div>
                        <div className="form-body">
                            <TextField
                                margin="normal"
                                rows={2}
                                fullWidth
                                multiline
                                inputRef={basicInformationRef}
                                id="basicInformation"
                                label="Általános információk"
                                name="basicInformation"
                            />
                            <TextField
                                margin="normal"
                                rows={2}
                                fullWidth
                                multiline
                                inputRef={allergiesRef}
                                id="allergies"
                                label="Allergiák"
                                name="allergies"
                            />
                            <TextField
                                margin="normal"
                                rows={2}
                                fullWidth
                                multiline
                                inputRef={injuriesRef}
                                id="injuries"
                                label="Sérülések"
                                name="injuries"
                            />
                            <div className="button-block">
                                <Button 
                                    type="submit"
                                    className="add-new-client-button" 
                                    variant="outlined" 
                                    startIcon={<AddCircleOutlineIcon />}>
                                    Új vendég hozzáadása
                                </Button>
                            </div>
                        </div>
                    </Box>
            </Container>
        </section>
    )
}

export default AddClients;