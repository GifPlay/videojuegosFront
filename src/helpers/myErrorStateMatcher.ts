import { FormControl, NgForm, FormGroupDirective } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";


export class MyErrorStateMatcher implements ErrorStateMatcher  {
  isErrorState(control: FormControl | any, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
