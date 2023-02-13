import NavbarLayout from "../../Layouts/NavbarLayout";
import ListStatSection from "../../components/statistics/ListStatsSection/ListStatSection";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import axios from "axios";
import { IncomePerDayInterface, IncomePerMonthInterface, ListStatInterface } from "../../interfaces/StatisticsInterface";
import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";
import IncomeSection from "../../components/statistics/ChartsSection/IncomeSection/IncomeSection";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/statistics/get-first-fetch-stats";
    const response = await axios.get(url, options);
    const todayData: ListStatInterface = response.data.todayData;
    const weekData: ListStatInterface = response.data.weekData;
    const monthData: ListStatInterface = response.data.monthData;
    const incomePerDay: IncomePerDayInterface = response.data.incomePerDay;
    const incomePerMonth: IncomePerMonthInterface = response.data.incomePerMonth;

    return {
        props: {
            todayData,
            weekData,
            monthData,
            incomePerDay,
            incomePerMonth,
        }
    }
}

const StatisticsPage = ({ todayData, weekData, monthData, incomePerDay, incomePerMonth }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { lang } = useContext(LangContext);

    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Statisztikák" : "Beauty Assistant | Statistics"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <section className="max-w-[1600px] m-auto">
                    <h1 className="page-title">{ lang === 'hun' ? "Statisztikák" : 'Statistics' }</h1>
                    <ListStatSection
                        todayData={todayData}
                        weekData={weekData}
                        monthData={monthData}
                    />
                    <IncomeSection
                        incomePerDay={incomePerDay}
                        incomePerMonth={incomePerMonth}
                    />
                </section>
            </NavbarLayout>
        </>
    )
}

export default StatisticsPage;