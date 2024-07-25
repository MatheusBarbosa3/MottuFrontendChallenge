import { Component, OnInit } from '@angular/core';
import { FeedbackComponent } from "../../../shared/components/feedback/feedback.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ICharacter } from '../../../shared/interfaces/character.interface';
import { FavoritesService } from '../../../core/store/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FeedbackComponent, 
    CardComponent, 
    AsyncPipe
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  public characters$: Observable<ICharacter[]> = new Observable();

  constructor(private favoriteService: FavoritesService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  public trackById(character: ICharacter): number {
    return character.id;
  }

  private getFavorites(): void {
    this.characters$ = this.favoriteService.getFavorites();
  }

  public removeFavorites(index: number): void {
    this.favoriteService.removeFavorite(index);
  }
}
