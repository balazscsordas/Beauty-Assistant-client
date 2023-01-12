import Welcome from "../../components/adminIndex/Welcome";
import NavbarLayout from "../../Layouts/NavbarLayout";

const MainIndexPage = () => {

    return (
        <>
            <NavbarLayout>
                <section id="admin-index-section">
                    <Welcome/>
                </section>
            </NavbarLayout>
        </>
    )
}


export default MainIndexPage;