import { Snackbar } from "@mui/material"
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface Props {
    open: boolean,
    onClose: () => void,
    text: string
    severity: AlertColor | undefined
}

export const Alert = ({ open, onClose, text, severity}: Props) => {
    return (
        <Snackbar 
            open={open}
            autoHideDuration={3000} 
            onClose={onClose}
            >
            <MuiAlert 
                onClose={onClose} 
                elevation={6}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}>
                {text}
            </MuiAlert>
        </Snackbar>
    )
}