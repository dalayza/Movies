import { Injectable } from '@angular/core';
// import { fakeMovies } from './fake-movies';
import { Movie } from '../models/movie';

// Get data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, catchError, map } from 'rxjs/operators';

// MessageService
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
};

@Injectable()
export class MovieService {
  private moviesURL = 'http://localhost:3000/movies';
  getMovies(): Observable<Movie[]> {
    // this.messageService.add(`${ new Date().toLocaleString()}. Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receivedMovies => console.log(`receivedMovies => ${JSON.stringify(receivedMovies)}`)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {    
    // return of(fakeMovies.find(movie => movie.id === id));
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovies => console.log(`selected movie => ${JSON.stringify(selectedMovies)}`)),
      catchError(error => of(new Movie()))
    );
  }

  /** PUT: update the movie on the server */
  updateMovie(movie: Movie): Observable<any> {    
    return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOptions).pipe(
      tap(updatedMovie => console.log(`updated movie => ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  /** POST: add a new movie to the server */
  addMovie(newMovie: Movie): Observable<Movie> {    
    return this.http.post(this.moviesURL, newMovie, httpOptions).pipe(
      tap((movie: Movie) => console.log(`inserted movie => ${JSON.stringify(movie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  /** DELETE: delete the movie from the server */
  deleteMovie(movieID: number): Observable<Movie> {   
    const url = `${this.moviesURL}/${movieID}`; 
    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted movie => ${movieID}`)),
      catchError(error => of(null))
    );
  }

  /** GET movies whose name contains search string*/
  searchMovies(typedString: string): Observable<Movie[]> {  
    if (!typedString.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundedMovies => console.log(`founded movies => ${JSON.stringify(foundedMovies)}`)),
      catchError(error => of(null))
    );
  }

  constructor(
    private http: HttpClient,
    public messageService: MessageService) { }

}
