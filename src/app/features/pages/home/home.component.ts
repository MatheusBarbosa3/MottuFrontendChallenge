import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { FeedbackComponent } from '../../../shared/components/feedback/feedback.component';
import { ICharacter } from '../../../shared/interfaces/character.interface';
import { CharacterService } from '../../../shared/services/character.service';
import { FavoritesService } from '../../../core/store/favorites.service';
import { ICharacterHistoric } from '../../../shared/interfaces/character-historic.interface';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SearchInputComponent,
    FeedbackComponent,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  public characterForm: FormGroup;

  public characters: ICharacter[] = [];

  public allCharacters: ICharacter[] = [];
  
  public historic: ICharacterHistoric[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharacterService,
    private favoriteService: FavoritesService
  ) {
    this.characterForm = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.loadAllCharacters();
    this.characterForm.get('name')?.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.searchByName(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private loadAllCharacters(): void {
    this.characterService.getAllCharacters().subscribe({
      next: (characters: ICharacter[]) => {
        this.allCharacters = characters;
        this.characters = characters;
        const favoritesIds = this.favoriteService.getFavoriteCharacterIds();
        this.allCharacters.forEach(character => {
          character.isFavorite = favoritesIds.includes(character.id);
        });
      },
      error: () => (this.characters = [])
    });
  }


  public searchByName(name: string): void {
    if (name === '') {
      this.characters = this.allCharacters;
      return;
    }

    const historic = this.historic.find((x) => x.name === name);
    if (historic) {
      this.characters = historic.characters;
      return;
    }

    this.characterService.getByName(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ICharacter[]) => this.processSuccessSearchByName(name, res),
        error: () => (this.characters = [])
      });
  }

  private processSuccessSearchByName(
    name: string,
    characters: ICharacter[]
  ): void {
    const favoritesIds = this.favoriteService.getFavoriteCharacterIds();

    characters.map((character) => {
      character.isFavorite = favoritesIds.includes(character.id);
    });
    this.characters = characters;

    this.historic.push({
      name,
      characters,
    });
  }

  public toggleFavorite(index: number): void {
    const character = this.characters[index];
    this.favoriteService.toggleFavorite(character);
    this.characters[index].isFavorite = !this.characters[index].isFavorite;
  }
}
