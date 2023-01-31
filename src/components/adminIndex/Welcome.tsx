import { useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import LangContext from '../../context/LanguageProvider';

const Welcome = () => {

    const { lang } = useContext(LangContext);
    const { firstName } = useContext(AuthContext);

    return (
        <section id="welcome-section">
            <h1 className="page-title">{ lang === 'hun' ? 'Szia ' : 'Hi ' }{ firstName }!</h1>
            <p>{ lang === 'hun' ? 'Mai időpontok száma: 0' : "Today's appointments: 0" }</p>
        </section>
    )
}

export default Welcome;