import Head from "next/head";
import { useContext } from "react";
import Salons from "../../components/appointment-booking/choose-salon/Salons";
import PageTitle from "../../components/appointment-booking/PageTitle";
import PhaseDisplayer from "../../components/appointment-booking/phase-displayer/PhaseDisplayer";
import LangContext from "../../context/LanguageProvider";
import NonAdminLayout from "../../Layouts/NonAdminLayout"

const ChooseSalon = () => {

    const { lang } = useContext(LangContext);

    return (
        <>
            <Head>
                <title>{ lang === 'hun' ? "Beauty Assistant | Időpontfoglalás" : "Beauty Assistant | Appointment booking"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NonAdminLayout>
                <PageTitle title={ lang === 'hun' ? "Szalon választása" : "Choose a salon" }/>
                <PhaseDisplayer
                    bgColor1="bg-yellow-300"
                    bgColor2="bg-slate-300"
                    bgColor3="bg-slate-300"
                    bgColor4="bg-slate-300"
                />
                <Salons/>
            </NonAdminLayout>
        </>
    )
}

export default ChooseSalon;