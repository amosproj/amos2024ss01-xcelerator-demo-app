import { Component, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IxDateDropdown } from '@siemens/ix-angular'; // Pfad zur externen Bibliothek
import { IxModule } from '@siemens/ix-angular'; // Pfad zur externen Bibliothek

@Component({
    selector: 'lib-date-dropdown-wrapper',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateDropdownWrapperComponent),
            multi: true,
        },
    ],
    standalone: true,
    template: `
        <ix-date-dropdown
            format="yyyy-MM-dd"
            range="false"
            (dateRangeChange)="onDateChange($event)"
        ></ix-date-dropdown>
    `,
    imports: [
        IxModule,
        FormsModule,
    ],
})
export class DateDropdownWrapperComponent implements ControlValueAccessor {
  @ViewChild(IxDateDropdown) private ixDateDropdown: IxDateDropdown;

  value: string;
  onChange: (value: string) => NonNullable<unknown>;
  onTouched:  () => NonNullable<unknown>;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDateChange(event: any): void {
      const date = new Date(event.detail.from)
      this.value = date.toISOString().slice(0, 10);
      this.onChange(this.value);
  }
}
