import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ICharacter } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private baseService: BaseService) { }

  public getAllCharacters(): Observable<ICharacter[]> {
    const query: string = `/character`
    
    return this.baseService.getUrl<ICharacter[]>(query);
  }

  public getByName(name: string): Observable<ICharacter[]> {
    const query: string = `/character?name=${name}`
    
    return this.baseService.getUrl<ICharacter[]>(query);
  }  
}
