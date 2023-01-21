import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from "next/link";

interface Props {
    name: string;
    url: string;
    icon: React.ReactElement;
}

const ListComponent = ({ name, url, icon}: Props) => {

    return (
        <section id="client-card-section">
            <div className="head-block">
                <Link href={url}>
                    <IconButton aria-label="account-icon-more-data">
                        {icon}
                    </IconButton>
                </Link>
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

export default ListComponent;