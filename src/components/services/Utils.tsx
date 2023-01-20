// Returns true if string contains at least one letter
export const timeAndPriceValidator = (value: string) => {
    return /^[0-9]+$/.test(value);
}