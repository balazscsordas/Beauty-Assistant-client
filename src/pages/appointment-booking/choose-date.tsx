import Head from "next/head";
import { useContext } from "react";
import Calendar from "../../components/appointment-booking/choose-date/Calendar";
import PageTitle from "../../components/appointment-booking/PageTitle";
import PhaseDisplayer from "../../components/appointment-booking/phase-displayer/PhaseDisplayer";
import LangContext from "../../context/LanguageProvider";
import NonAdminLayout from "../../Layouts/NonAdminLayout"

const ChooseService = () => {

    const { lang } = useContext(LangContext);

    return (
        <>
            <Head>
                <title>{ lang === 'hun' ? "Beauty Assistant | Időpontfoglalás" : "Beauty Assistant | Appointment booking"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NonAdminLayout>
                <PageTitle title={ lang === 'hun' ? "Időpont választása" : "Choose date" }/>
                <PhaseDisplayer
                    bgColor1="bg-green-300"
                    bgColor2="bg-green-300"
                    bgColor3="bg-yellow-300"
                    bgColor4="bg-slate-300"
                />
                <Calendar/>
            </NonAdminLayout>
        </>
    )
}

export default ChooseService;