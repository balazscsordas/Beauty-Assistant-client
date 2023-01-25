// returns true if format of age is not valid
export const ageValidator = (value: string) => {
    if(!value || ( value[value.length-1].match('[0-9]') && value[0].match('[1-9]'))) {
        return false;
    } else {
        return true;
    }
}

export const mobileNumberValidator = (value: string) => {
    if (value.charAt(0) !== '+' && value.length > 0) {
        return true
    } else {
        return false
    }
}

// returns true if string contains number
export const trueIfNumberValidator = (value: string) => {
    return /\d/.test(value); 
}

// Returns true if string contains at least one letter
export const trueIfLetterValidator = (value: string) => {
    return /[a-zA-Z]/.test(value);
}