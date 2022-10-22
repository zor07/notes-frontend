export const maxLengthCreator = (maxlength) => value => {
    if (value && value.length > maxlength) return `Max length is ${maxlength}`
    return undefined
}

export const required = (value) => (value ? undefined : "Required");
