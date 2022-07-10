export function getFormValues(form: HTMLFormElement): Record<string, string> {
    return Array.from(form).reduce((acc, elem: HTMLInputElement) => {
        if (elem.name) {
            return { [elem.name]: elem.value, ...acc};
        }
        return acc;
    }, {})
}