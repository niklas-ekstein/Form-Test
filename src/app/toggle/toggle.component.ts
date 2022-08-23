import { Component, OnInit, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  //Onödigt? rensa?
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})

//Kan ta bort tre metoderna och implements ControlValueAccessor va? Mer ska bort?
export class ToggleComponent implements ControlValueAccessor {

  constructor() { }
  @Input() checkedLabelText!: string;
  @Input() uncheckedLabelText!: string;

  isChecked = true;
  isDisabled = false;
  isTouched = false;
  onChange!: (isChecked: boolean) => void;
  onTouch!: () => void;

  writeValue(checked: boolean): void {
    this.isChecked = checked;
  }

  registerOnChange(onChange: (isChecked: boolean) => void): void {
    console.log("hej 1")
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
   // this.onTouch = onTouch;
  }

  setDisabledState(isDisabled: boolean): void {
    //this.isDisabled = isDisabled;
  }

  toggle(): void {
    this.messageEvent.emit(this.message)
    console.log("hej 2")

    console.log(this.isChecked)

    if (!this.isDisabled) {
      this.isChecked = !this.isChecked;
    }
  }

  //ngOnInit(): void {
  //}

  message: string = "tjena mannen!"

  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit(this.message)
  }
  
}
