import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import StatusFilterItem from "./StatusFilterItem"

const StatusFilter = () => {

    const { lang } = useContext(LangContext);
 
    const statuses = [
        {
            engName: 'expired',
            hunName: lang === 'hun' ? 'Lejárt' : 'Expired'
        },
        {
            engName: 'pending',
            hunName: lang === 'hun' ? 'Függőben' : 'Valid'
        },
        {
            engName: 'used',
            hunName: lang === 'hun' ? 'Felhasznált' : 'Used'
        }
    ];

    return (
        <section className="mt-4">
            {statuses.map((status, index) => (
                <StatusFilterItem key={index} hunName={status.hunName} engName={status.engName}/>
            ))}
        </section>
    )
}

export default StatusFilter;