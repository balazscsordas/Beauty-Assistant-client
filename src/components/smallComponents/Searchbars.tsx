import { OneLineNonReqInput } from "./InputFields"

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
}

export const Searchbar = ({ onChange, value }: Props) => {
    return (
        <div className="searchbar-section">
            <OneLineNonReqInput 
                label="Keresés"
                type="search"
                value={value}
                nameVal="searchbar"
                onChange={onChange}
            />
        </div> 
    )
}