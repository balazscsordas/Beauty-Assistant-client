import { useContext } from 'react';
import AuthContext from "../../context/AuthProvider";

const Welcome = () => {

    const { auth } = useContext(AuthContext);

    return (
        <section id="welcome-section">
            <h1 className="page-title">Szia { auth && auth.firstName }</h1>
            <p>Mai időpontok száma: 0</p>
        </section>
    )
}

export default Welcome;