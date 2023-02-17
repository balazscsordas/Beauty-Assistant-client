import Router from "next/router";
import { useContext, useEffect } from "react";
import BookAppointmentContext from "../../../context/BookAppointmentProvider";
import ServiceItem from "./ServiceItem";

const Services = () => {

    const { serviceList, bookAppointmentData } = useContext(BookAppointmentContext);

    useEffect(() => {
        !bookAppointmentData.adminId && Router.push("/appointment-booking/choose-salon");
    }, [])

    return (
        <section className="max-w-7xl w-full mx-auto px-4 mb-4 min-h-full">
            <div className="flex flex-row flex-wrap justify-center">
                {serviceList
                    && serviceList.map((service,index) => (
                        <ServiceItem 
                            key={index}
                            name={service.name}
                            price={service.price}
                            time={service.time}
                            _id={service._id}
                        />
                    ))}
            </div>
        </section>
    )
}

export default Services;