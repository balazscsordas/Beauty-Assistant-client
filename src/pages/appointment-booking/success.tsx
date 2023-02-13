import Head from "next/head";
import { useContext } from "react";
import PageTitle from "../../components/appointment-booking/PageTitle";
import PhaseDisplayer from "../../components/appointment-booking/phase-displayer/PhaseDisplayer";
import Success from "../../components/appointment-booking/thankyou/Success";
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
                <PageTitle title={ lang === 'hun' ? "Siker" : "Success" }/>
                <PhaseDisplayer
                    bgColor1="bg-green-300"
                    bgColor2="bg-green-300"
                    bgColor3="bg-green-300"
                    bgColor4="bg-green-300"
                />
                <Success/>
            </NonAdminLayout>
        </>
    )
}

export default ChooseService;