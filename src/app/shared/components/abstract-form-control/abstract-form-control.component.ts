import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  template: ''
})
export abstract class AbstractFormControlComponent implements OnInit, OnChanges {
  @Input() public label: string = '';

  @Input() public placeholder: string = '';
  
  @Input() public controlName: string = '';

  public formGroupRef!: FormGroup;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.initializeFormGroupRef();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlName'] && !changes['controlName'].isFirstChange()) {
      this.initializeFormGroupRef();
    }
  }

  private initializeFormGroupRef(): void {
    const form = this.formGroupDirective.form;
    if (!form) {
      throw new Error('FormGroup Reference not Found');
    }
    if (!this.controlName) {
      throw new Error('ControlName not informed');
    }
    this.formGroupRef = form;
  }
}
