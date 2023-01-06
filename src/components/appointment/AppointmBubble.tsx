import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AppointmentInterface } from '../../interfaces/AppointmentInterfaces';

interface Props {
    appointment: AppointmentInterface
}

const AppointmentBubble = ({ appointment }: Props) => {
    return (
        <div id='appointment-bubble'>
            <ErrorOutlineIcon/>
            {appointment.clientName}
        </div>
    )
}

export default AppointmentBubble;