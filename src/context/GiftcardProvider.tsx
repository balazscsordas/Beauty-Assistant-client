import React, { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode
}

interface GiftcardContextInterface {
    showStartDateDialog: boolean;
    setShowStartDateDialog: React.Dispatch<React.SetStateAction<boolean>>;
    showEndDateDialog: boolean;
    setShowEndDateDialog: React.Dispatch<React.SetStateAction<boolean>>;
    giftcardStartDate: Date,
    setGiftcardStartDate: React.Dispatch<React.SetStateAction<Date>>;
    giftcardEndDate: Date,
    setGiftcardEndDate: React.Dispatch<React.SetStateAction<Date>>;
    statusFilterArray: string[];
    setStatusFilterArray: React.Dispatch<React.SetStateAction<string[]>>;
}


const GiftcardContext = createContext<GiftcardContextInterface>({} as GiftcardContextInterface);

export const GiftcardProvider = ({children}: Props) => {
    const [showStartDateDialog, setShowStartDateDialog] = useState(false);
    const [showEndDateDialog, setShowEndDateDialog] = useState(false);
    const [giftcardStartDate, setGiftcardStartDate] = useState(new Date())
    const [giftcardEndDate, setGiftcardEndDate] = useState(new Date())
    const [statusFilterArray, setStatusFilterArray] = useState(['expired', 'pending', 'used'])

    return (
        <GiftcardContext.Provider value={{ 
                                        showStartDateDialog, 
                                        setShowStartDateDialog,
                                        showEndDateDialog, 
                                        setShowEndDateDialog,
                                        giftcardStartDate,
                                        setGiftcardStartDate,
                                        giftcardEndDate,
                                        setGiftcardEndDate,
                                        statusFilterArray,
                                        setStatusFilterArray,
                                    }}>
            {children}
        </GiftcardContext.Provider>
    )
}

export default GiftcardContext;