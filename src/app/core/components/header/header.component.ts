import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ICharacter } from '../../../shared/interfaces/character.interface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../store/favorites.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive, 
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public favorites$: Observable<ICharacter[]> = new Observable();

  constructor(private favoriteService: FavoritesService) {}

  ngOnInit(): void {
    this.initializeFavoriteCountObserver();
  }

  private initializeFavoriteCountObserver(): void {
    this.favorites$ = this.favoriteService.getFavorites();
  }
}
