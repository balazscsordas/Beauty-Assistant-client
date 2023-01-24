import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import ListComponent from "../smallComponents/ListComponent";
import { Searchbar } from "../smallComponents/Searchbars";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StatusFilter from "./statusFilter/StatusFilter";
import GiftcardContext from "../../context/GiftcardProvider";
import { giftcardFilterByStatus } from "./Utils";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";

interface Props {
    giftcardList: GiftcardInterface[],
}

const GiftcardList = ({ giftcardList }: Props) => {

    const { statusFilterArray } = useContext(GiftcardContext);
    const [filteredListByStatus, setFilteredListByStatus] = useState<GiftcardInterface[]>(giftcardList)
    const [inputTextValue, setInputTextValue] = useState("");
    const [filteredArray, setFilteredArray] = useState<GiftcardInterface[]>([])

    useEffect(() => {
      setFilteredListByStatus(giftcardFilterByStatus(giftcardList, statusFilterArray));
    }, [statusFilterArray])

    useEffect(() => {
    }, [filteredListByStatus])
    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(e.target.value);
        const result = filteredListByStatus.filter((giftcard: GiftcardInterface) => {
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
        <section className="text-center">
            <h1 className="page-title">Ajándékutalvány</h1>
            <SectionWrapper>
                <Link href="/admin/add-new-giftcard" passHref>
                    <AddIconPrimaryButton text='ajándékutalvány hozzáadása' />
                </Link>
                { giftcardList.length !== 0 && <StatusFilter />}
                <Searchbar onChange={changeSearchBarData} value={inputTextValue}/>
                <div>
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
                    {giftcardList.length === 0 && filteredListByStatus.length === 0
                        ? <p>Még nem adtál hozzá ajándékutalványt!</p>
                        : inputTextValue === "" && filteredListByStatus.map((giftcard: GiftcardInterface, index: number) => (
                        <ListComponent
                            key={index}
                            status={giftcard.status}
                            name={giftcard.identifier}
                            url={`/admin/giftcards/${giftcard._id}`}
                            icon={<CardGiftcardIcon/>}
                        />
                    ))}
                    {giftcardList.length !== 0 && filteredListByStatus.length === 0
                        && <p>Nincs a szűrésnek megfelelő ajándékutalvány!</p>
                    }
                </div>
            </SectionWrapper>
        </section>
    )
}

export default GiftcardList;