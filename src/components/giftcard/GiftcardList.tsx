import Link from "next/link";
import { useState } from "react";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import ListComponent from "../smallComponents/ListComponent";
import { Searchbar } from "../smallComponents/Searchbars";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

interface Props {
    giftcardList: GiftcardInterface[],
}

const GiftcardList = ({ giftcardList }: Props) => {

    const [inputTextValue, setInputTextValue] = useState("");
    const [filteredArray, setFilteredArray] = useState<GiftcardInterface[]>([])

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(e.target.value);
        const result = giftcardList.filter((giftcard: GiftcardInterface) => {
            if (e.target.value === "") {
                return giftcard
            }
            else {
                return giftcard.identifier.toLowerCase().includes(e.target.value.toLowerCase());
            }
        })
        setFilteredArray(result);
    }

    return (
        <section className="text-center max-w-3xl m-auto">
            <h1 className="page-title">Ajándékutalvány</h1>
            <Link href="/admin/add-new-giftcard" passHref>
                <AddIconPrimaryButton text='ajándékutalvány hozzáadása' />
            </Link>
            { giftcardList.length !== 0 
                    && <Searchbar onChange={changeSearchBarData} value={inputTextValue}/>
                }
                <div className="client-list">
                    {filteredArray.length === 0
                        ? inputTextValue !== "" && <p>Nincs a keresésnek megfelelő találat!</p>
                        : inputTextValue !== "" && filteredArray.map((giftcard: GiftcardInterface, index: number) => (
                        <ListComponent
                            key={index}
                            status={giftcard.status}
                            name={giftcard.identifier}
                            url={`/admin/giftcards/${giftcard._id}`}
                            icon={<CardGiftcardIcon/>}
                        />
                    ))}
                    {giftcardList.length === 0 
                        ? <p>Még nem adtál hozzá vendéget!</p>
                        : inputTextValue === "" && giftcardList.map((giftcard: GiftcardInterface, index: number) => (
                        <ListComponent
                            key={index}
                            status={giftcard.status}
                            name={giftcard.identifier}
                            url={`/admin/giftcards/${giftcard._id}`}
                            icon={<CardGiftcardIcon/>}
                        />
                    ))}
                </div>
        </section>
    )
}

export default GiftcardList;