import { useState } from "react";
import { SalonDataInterface } from "../../../interfaces/SalonDataInterface";
import SalonItem from "./SalonItem";
import SalonSearchbar from "./SalonSearchbar";

const Salons = () => {

    const [salonList, setSalonList] = useState<null | SalonDataInterface[]>(null)

    return (
        <section className="max-w-7xl w-full mx-auto px-4 mb-4 min-h-full">
            <SalonSearchbar setSalonList={setSalonList}/>
            <div className="flex flex-row flex-wrap justify-center">
                {salonList
                    && salonList.map((salon,index) => (
                        <SalonItem 
                            key={index}
                            name={salon.name}
                            city={salon.city}
                            address={salon.address}
                            professions={salon.professions}
                            adminId={salon.adminId}
                        />
                    ))}
            </div>
        </section>
    )
}

export default Salons;