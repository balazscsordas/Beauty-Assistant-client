import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from "next/link";

const ServiceCard = ({ name, category, _id }: ServiceListInterface) => {

    const url = `/admin/services/${_id}`

    return (
        <section id="service-card-section">
            <div className="head-block">
                <h5 className="name-title">{name}</h5>
                <Link href={url} className="hamburger-icon">
                    <IconButton aria-label="more data">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Link>
            </div>
        </section>
    )
}

export default ServiceCard;