import { Injectable } from '@angular/core';
import { fakeMovies } from './fake-movies';
import { Movie } from '../models/movie';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';
import { of } from 'rxjs';

//MessageService
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  getMovies(): Observable<Movie[]> {
    this.messageService.add(`${ new Date().toLocaleString()}. Get movie list`);
    return of(fakeMovies);
  }
  constructor(public messageService: MessageService) { }
}
