import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import { useState } from "react";

interface Props {
    name: string;
    url: string;
    icon: React.ReactElement;
    status: string;
}

const ListComponent = ({ name, url, icon, status }: Props) => {

    console.log(status);

    const setStatus = (status: string) => {
        if (status === "pending") {
            return "bg-yellow-200";
        }
        if (status === "finished") {
            return "bg-green-200";
        }
        return "bg-red-200";
    }

    const [bgColor] = useState(setStatus(status));

    return (
        <section id="client-card-section" className="my-3">
            <div className={`head-block flex items-center relative p-2 rounded-xl drop-shadow-md ${bgColor}`}>
                <Link href={url}>
                    <IconButton aria-label="account-icon-more-data">
                        {icon}
                    </IconButton>
                </Link>
                <h5 className="mb-0 inline-block font-medium ml-3">{name}</h5>
                <Link href={url} className="ml-auto">
                    <IconButton aria-label="more data">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Link>
            </div>
        </section>
    )
}

export default ListComponent;