import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$: Observable<string[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const favorites = JSON.parse(stored);
        this.favoritesSubject.next(favorites);
      } catch (e) {
        console.error('Error loading favorites from localStorage', e);
      }
    }
  }

  private saveFavorites(favorites: string[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): Observable<string[]> {
    return this.favorites$;
  }

  isFavorite(songId: string): Observable<boolean> {
    return this.favorites$.pipe(
      map(favorites => favorites.includes(songId))
    );
  }

  toggleFavorite(songId: string): void {
    const currentFavorites = this.favoritesSubject.value;
    const index = currentFavorites.indexOf(songId);
    
    if (index > -1) {
      this.saveFavorites(currentFavorites.filter(id => id !== songId));
    } else {
      this.saveFavorites([...currentFavorites, songId]);
    }
  }

  addFavorite(songId: string): void {
    const currentFavorites = this.favoritesSubject.value;
    if (!currentFavorites.includes(songId)) {
      this.saveFavorites([...currentFavorites, songId]);
    }
  }

  removeFavorite(songId: string): void {
    const currentFavorites = this.favoritesSubject.value;
    this.saveFavorites(currentFavorites.filter(id => id !== songId));
  }
}
