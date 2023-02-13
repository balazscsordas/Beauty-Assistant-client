import myImage from "../../../../public/enen2.png";
import accountImage from "../../../../public/account_image.webp";
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContext, useState } from "react";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { BasicPrimaryButton } from "../../smallComponents/Buttons";
import Zoom from "@mui/material/Zoom";
import { SalonDataInterface } from "../../../interfaces/SalonDataInterface";
import Router from "next/router";
import BookAppointmentContext from "../../../context/BookAppointmentProvider";
import axios from "axios";
import LangContext from "../../../context/LanguageProvider";


const SalonItem = ({ name, address, city, professions, adminId }: SalonDataInterface) => {

    const { lang } = useContext(LangContext);
    const { setBookAppointmentData, setServiceList } = useContext(BookAppointmentContext);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setBookAppointmentData(prevValues => {
            return {
                ...prevValues,
                adminId: adminId,
                salonName: name,
            }
        })
        getServiceList(adminId);
        Router.push('/appointment-booking/choose-service');
    }

    const getServiceList = async (adminId: string) => {
        try {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/book-appointment/get-service-list/";
            const options = {
                params: {
                    adminId
                }
            }
            const response = await axios.get(url, options);
            const serviceList = response.data.foundServices;
            setServiceList(serviceList);
            setLoading(false);
        } catch(err) {
            setLoading(false);
            err instanceof Error && console.log(err.message)
        }
    }

    return (
        <Zoom in={name ? true : false}>
            <section className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 md:p-6 m-4 w-80 max-w-full">
                <div className="flex flex-col h-full">
                    <div className="mb-4">
                        <Image 
                            src={accountImage} alt="me" 
                            width={120} height={120}
                            className="m-auto mb-4"
                        />
                        <h4 className="font-semibold text-center">{ name }</h4>
                    </div>
                    <div className="text-sm mx-auto font-medium leading-7 mb-8">
                        <div className="flex flex-row items-center mt-4 flex-wrap">
                            <BusinessCenterIcon fontSize="small"/>
                            <span className="ml-2">{ professions }</span>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <LocationOnIcon fontSize="small"/>
                            <span className="ml-2">{`${city} - ${address}`}</span>
                        </div>
                    </div>
                    <div className="mx-auto mt-auto">
                        <BasicPrimaryButton text={ lang === 'hun' ? "Kiválasztás" : "Choose" } onClick={handleClick} disabled={loading}/>
                    </div>
                </div>
            </section>
        </Zoom>
    )
}

export default SalonItem;