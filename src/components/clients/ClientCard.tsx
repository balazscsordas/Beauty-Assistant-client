import { ClientListInterface } from "../../interfaces/ClientInterfaces";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Col } from 'react-bootstrap';
import Link from "next/link";

const ClientCard = ({ name, age, _id }: ClientListInterface) => {

    const url = `/admin/clients/${_id}`

    return (
        <section id="client-card-section">
            <div className="head-block">
                <Link href={url}>
                    <IconButton aria-label="account-icon-more-data">
                        <AccountCircleIcon className="account-icon"/>
                    </IconButton>
                </Link>
                <h3 className="name-title">{name}</h3>
                <Link href={url} className="hamburger-icon">
                    <IconButton aria-label="more data">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Link>
            </div>
        </section>
    )
}

export default ClientCard;