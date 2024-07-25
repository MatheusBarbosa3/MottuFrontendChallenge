import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractFormControlComponent } from '../abstract-form-control/abstract-form-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent extends AbstractFormControlComponent {
  @Input() public type = 'text';

  @Output() public onType: EventEmitter<null> = new EventEmitter();

  public notifyOnType(): void {
    this.onType.emit();
  }
}
