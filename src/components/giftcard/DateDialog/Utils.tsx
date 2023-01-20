import { getNamedMonth } from "../../appointment/Utils";
  
export const generateRandomIdentifier = () => {
    const length = 10;
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
}

export const getCurrentMonthDays = (date: Date) => {
    const daysInMonth = new Date(date.getUTCFullYear(), date.getUTCMonth()+1, 0).getUTCDate();
    let daysInMonthArray: string[] = []
    for (let index = 1; index <= daysInMonth + 1; index++) {
        daysInMonthArray.push(String(index));
    }
    return daysInMonthArray;
}

export const formatDate = (date: Date) => {
    const result = date.toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    return result;
}

export const formatYearAndMonth = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = getNamedMonth(date);
    const result = year + " " + month;
    return result;
}

export const goToNextMonth = (date: Date) => {
    if (date.getMonth() == 11) {
        const result = new Date(date.getFullYear() + 1, 0, 3);
        return result;
    } else {
        const result = new Date(date.getFullYear(), date.getMonth() + 1, 3);
        return result;
    }
}

export const goToPrevMonth = (date: Date) => {
    if (date.getMonth() == 0) {
        const result = new Date(date.getFullYear() - 1, 11, 3);
        return result;
    } else {
        const result = new Date(date.getFullYear(), date.getMonth() - 1, 3);
        return result;
    }
}

export const createNewDateAfterChoosingDay = (date: Date, day: string) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const result = new Date(`${year}-${month}-${day}-12:00`);
    return result;

}
 
export const getSpanArray = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const newDate = new Date(year, month, 1);
    const dayOfWeek = newDate.getDay();
    switch (dayOfWeek) {
        case 0:
            return [0, 1, 2, 3, 4, 5]
        case 1:
            return []
        case 2:
            return [0]
        case 3:
            return [0, 1]
        case 4:
            return [0, 1, 2]
        case 5:
            return [0, 1, 2, 3]
        case 6:
            return [0, 1, 2, 3, 4]
    
        default:
            return []
    }
}
