import { useContext } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";
import LangContext from "../../context/LanguageProvider";
import { BasicPrimaryButton, BasicSecondaryButton } from "./Buttons";

interface Props {
    deleteLabel: string;
    deleteFunction: () => void;
}

const DeleteDialog = ({ deleteLabel, deleteFunction }: Props) => {

    const { lang } = useContext(LangContext);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const deleteItem = () => {
        deleteFunction();
        setDeleteDialogOpen(false);
    }

    return (
        <div className="text-center mt-4">
            <BasicSecondaryButton onClick={() => setDeleteDialogOpen(true)} text={ lang === 'hun' ? "Törlés" : "Delete" }/>
            <BasicPrimaryButton type="submit" text={ lang === 'hun' ? "Mentés" : "Save" }/>
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
                    <BasicSecondaryButton onClick={() => setDeleteDialogOpen(false)} text={ lang === 'hun' ? "Nem" : "No" }/>
                    <BasicPrimaryButton onClick={deleteItem} text={ lang === 'hun' ? "Igen" : "Yes" }/>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteDialog;