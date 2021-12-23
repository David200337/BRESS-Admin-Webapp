import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date = new Date(control.value);
        console.log(`validate: ${date}`)
        console.log(`today: ${new Date()}`)
        if (!date) {
            return null;
        }
        console.log(date < new Date() ? {FutureDate:true} : null)
        return date < new Date() ? {futureDate:true} : null
    }
}