import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() public id: number = 0;

  @Input() public name: string = '';

  @Input() public image: string = '';
  
  @Input() public species: string = '';

  @Input() public isFavorite: boolean = false;

  @Output() public onClickFavorite: EventEmitter<number> = new EventEmitter();

  public handleClickFavorite(): void {
    this.onClickFavorite.emit(this.id);
  }
}
