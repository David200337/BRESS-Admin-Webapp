import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date = new Date(control.value);
        if (!date) {
            return null;
        }
        return date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ? { futureDate: true } : null
    }
}