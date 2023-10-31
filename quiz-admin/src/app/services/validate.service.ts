import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class ValidateService {
  date(controls: FormControl) {
    const date = new Date(controls.value).toLocaleDateString();
    const regExp = new RegExp(/^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/);
    if (!regExp.test(date) && date.length > 0) {
      return { date: { value: true } };
    }
  }

  email(controls: FormControl) {
    const regExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { email: { value: true } };
    }
  }

  letters(controls: FormControl) {
    const regExp = new RegExp(/^[a-zA-Z0-9_\-.\s]+$/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { letters: { value: true } };
    }
  }

  number(controls: FormControl) {
    const regExp = new RegExp(/^[0-9]*$/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { number: { value: true } };
    }
  }

  phoneNumber(controls: FormControl) {
    const regExp = new RegExp(/^[0-9()-]*$/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { phoneNumber: { value: true } };
    }
  }

  numberAndLetters(controls: FormControl) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+(?:[\w -]*[a-zA-Z0-9]+)*$/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { numberAndLetters: { value: true } };
    }
  }

  address(controls: FormControl) {
    const regExp = new RegExp(/^[a-zA-Z0-9-#_\-.,)(@}{\s]+$/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { address: { value: true } };
    }
  }

  password(controls: FormControl): any {
    const regExp = new RegExp(/((?=.*\d)(?=.*[A-Z])(?=.*\W))/);

    if (!regExp.test(controls.value) && controls.value.length > 0) {
      return { password: { value: true } };
    }
  }

  numberOnly(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    return charCode > 31 && (charCode < 48 || charCode > 57) ? false : true;
  }
}
