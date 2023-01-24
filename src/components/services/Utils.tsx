// Returns true if string contains at least one letter
export const priceValidator = (value: string) => {
    return /^[0-9]+$/.test(value);
}