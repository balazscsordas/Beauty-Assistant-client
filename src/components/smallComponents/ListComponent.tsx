import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";

interface Props {
    name: string;
    url: string;
    icon: React.ReactElement;
    status?: string;
}

const ListComponent = ({ name, url, icon, status }: Props) => {

    const setStatus = (status: string) => {
        if (status === "pending") {
            return "bg-yellow-200";
        }
        if (status === "used") {
            return "bg-green-200";
        }
        return "bg-red-200";
    }

    return (
        <section className="my-3">
            <Link href={url}>
                <div className={`text-gray-600 head-block flex items-center relative p-2 sm:p-3 rounded-xl shadow-md ${status ? setStatus(status) : 'bg-red-200'}`}>
                    {icon}
                    <p className="mb-0 inline-block font-medium ml-3">{name}</p>
                    <AddCircleOutlineIcon className="ml-auto"/>
                </div>
            </Link>
        </section>
    )
}

export default ListComponent;