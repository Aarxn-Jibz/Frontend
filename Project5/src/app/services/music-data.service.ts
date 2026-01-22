import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Song } from '../models/song.interface';
import { Artist } from '../models/artist.interface';
import { Album } from '../models/album.interface';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  private songsUrl = 'assets/data/songs.json';
  private artistsUrl = 'assets/data/artists.json';
  private albumsUrl = 'assets/data/albums.json';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsUrl);
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.artistsUrl);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl);
  }

  getSongById(id: string): Observable<Song | undefined> {
    return this.getSongs().pipe(
      map(songs => songs.find(song => song.id === id))
    );
  }

  getArtistById(id: string): Observable<Artist | undefined> {
    return this.getArtists().pipe(
      map(artists => artists.find(artist => artist.id === id))
    );
  }

  getAlbumById(id: string): Observable<Album | undefined> {
    return this.getAlbums().pipe(
      map(albums => albums.find(album => album.id === id))
    );
  }

  getSongsByArtist(artistId: string): Observable<Song[]> {
    return this.getSongs().pipe(
      map(songs => songs.filter(song => song.artistId === artistId))
    );
  }

  getAlbumsByArtist(artistId: string): Observable<Album[]> {
    return this.getAlbums().pipe(
      map(albums => albums.filter(album => album.artistId === artistId))
    );
  }

  getAllData(): Observable<{ songs: Song[]; artists: Artist[]; albums: Album[] }> {
    return forkJoin({
      songs: this.getSongs(),
      artists: this.getArtists(),
      albums: this.getAlbums()
    });
  }
}
