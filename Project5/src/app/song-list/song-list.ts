import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MusicDataService } from '../services/music-data.service';
import { PlayerService } from '../services/player.service';
import { FavoritesService } from '../services/favorites.service';
import { Song } from '../models/song.interface';
import { Artist } from '../models/artist.interface';
import { Album } from '../models/album.interface';

interface SongWithDetails extends Song {
  artist?: Artist;
  album?: Album;
  isFavorite: boolean;
}

@Component({
  selector: 'app-song-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    RouterModule
  ],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css',
})
export class SongList implements OnInit {
  songs$: Observable<SongWithDetails[]>;
  displayedColumns: string[] = ['cover', 'title', 'artist', 'album', 'duration', 'actions'];

  constructor(
    private musicDataService: MusicDataService,
    private playerService: PlayerService,
    private favoritesService: FavoritesService
  ) {
    this.songs$ = combineLatest([
      this.musicDataService.getSongs(),
      this.musicDataService.getArtists(),
      this.musicDataService.getAlbums(),
      this.favoritesService.getFavorites()
    ]).pipe(
      map(([songs, artists, albums, favorites]) => {
        return songs.map(song => {
          const artist = artists.find(a => a.id === song.artistId);
          const album = albums.find(a => a.id === song.albumId);
          return {
            ...song,
            artist,
            album,
            isFavorite: favorites.includes(song.id)
          };
        });
      })
    );
  }

  ngOnInit(): void {}

  playSong(song: Song): void {
    this.playerService.playSong(song);
  }

  toggleFavorite(songId: string): void {
    this.favoritesService.toggleFavorite(songId);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  viewArtist(artistId: string): string {
    return `/artist/${artistId}`;
  }
}
