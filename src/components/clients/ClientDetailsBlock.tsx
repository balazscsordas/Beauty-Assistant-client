import { useState, useRef } from "react";
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

const ClientDetailsBlock = (props) => {

    return (
        <>
            <h1 className="section-title">{props.name}</h1>
            <div className="information-block">
                <div className="title-block">
                    <h3>{props.blockName}</h3>
                    {props.editModeState
                        && <IconButton className="edit-icons" onClick={() => {props.setEditModeState(false)}} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                    }
                </div>
                <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    disabled={props.editModeState}
                    inputRef={props.ref}
                    defaultValue={props.baseInformation}
                />
            </div>
        </>
    )
}

export default ClientDetailsBlock;