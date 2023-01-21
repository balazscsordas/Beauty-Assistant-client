import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";
import { BasicPrimaryButton, BasicSecondaryButton } from "./Buttons";

interface Props {
    deleteLabel: string;
    deleteFunction: () => void;
}

const DeleteDialog = ({ deleteLabel, deleteFunction }: Props) => {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const deleteItem = () => {
        deleteFunction();
        setDeleteDialogOpen(false);
    }

    return (
        <div className="buttons-block">
            <BasicSecondaryButton onClick={() => setDeleteDialogOpen(true)} text="Törlés"/>
            <BasicPrimaryButton type="submit" text="Mentés"/>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {deleteLabel}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BasicSecondaryButton onClick={() => setDeleteDialogOpen(false)} text="Nem"/>
                    <BasicPrimaryButton onClick={deleteItem} text="Igen"/>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteDialog;