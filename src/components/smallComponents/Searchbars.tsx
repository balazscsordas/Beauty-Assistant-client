import { useContext } from "react"
import LangContext from "../../context/LanguageProvider"
import { OneLineNonReqInput } from "./InputFields"

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
}

export const Searchbar = ({ onChange, value }: Props) => {

    const { lang } = useContext(LangContext);

    return (
        <div className="mt-4 mb-6 sm:mt-6 sm:mb-8">
            <OneLineNonReqInput 
                label={ lang === 'hun' ? "Keresés" : 'Search' }
                type="search"
                value={value}
                nameVal="searchbar"
                onChange={onChange}
            />
        </div> 
    )
}