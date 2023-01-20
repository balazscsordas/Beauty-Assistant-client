import Link from "next/link";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";

const Giftcard = () => {

    return (
        <section id="statistics-section">
            <h1 className="page-title">Ajándékutalvány</h1>
            <Link href="/admin/add-new-giftcard" passHref>
                <AddIconPrimaryButton text='ajándékutalvány hozzáadása' />
            </Link>
            <p>Még nem adtál hozzá ajándékutalványt.</p>
        </section>
    )
}

export default Giftcard;