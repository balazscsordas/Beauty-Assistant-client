import { ClientListInterface } from "../../interfaces/ClientInterfaces";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Col } from 'react-bootstrap';

const ClientCard = ({ name, age }: ClientListInterface) => {
    return (
        <Col lg={4} md={6}>
            <section id="client-card-section">
                <div className="head-block">
                    <AccountCircleIcon className="account-icon" />
                    <h3 className="name-title">{name}</h3>
                    <IconButton className="hamburger-icon" aria-label="more data">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </section>
        </Col>
    )
}

export default ClientCard;