import { useContext } from 'react';
import AuthContext from "../../context/AuthProvider";

const Welcome = () => {

    const { firstName } = useContext(AuthContext);

    return (
        <section id="welcome-section">
            <h1 className="page-title">Szia { firstName }!</h1>
            <p>Mai időpontok száma: 0</p>
        </section>
    )
}

export default Welcome;