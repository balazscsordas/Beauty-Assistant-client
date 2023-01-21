import { OneLineNonReqInput } from "./InputFields"

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
}

export const Searchbar = ({ onChange, value }: Props) => {
    return (
        <div className="my-8">
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