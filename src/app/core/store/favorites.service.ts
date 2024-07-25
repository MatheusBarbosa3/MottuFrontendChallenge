import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICharacter } from '../../shared/interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public favorites$: BehaviorSubject<ICharacter[]> = 
    new BehaviorSubject<ICharacter[]>([]);

  public getFavorites(): Observable<ICharacter[]> {
    return this.favorites$.asObservable();
  }

  public getFavoriteCharacterIds(): number[] {
    return this.favorites$.value.map(favorite => favorite.id);
  }
  
  public toggleFavorite(character: ICharacter): void {
    const favorites = this.favorites$.value;
    const index = favorites.findIndex(fav => fav.id === character.id);

    if (index > -1) {
      // Remove favorite
      favorites.splice(index, 1);
    } else {
      // Add favorite
      favorites.push(character);
    }

    this.favorites$.next([...favorites]);
  }

  public removeFavorite(index: number): void {
    const favorites = this.favorites$.value.filter((_, i) => i !== index);
    this.favorites$.next(favorites);
  }
}
