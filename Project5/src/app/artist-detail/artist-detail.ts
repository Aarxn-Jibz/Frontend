import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MusicDataService } from '../services/music-data.service';
import { PlayerService } from '../services/player.service';
import { Artist } from '../models/artist.interface';
import { Album } from '../models/album.interface';
import { Song } from '../models/song.interface';

@Component({
  selector: 'app-artist-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule
  ],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.css',
})
export class ArtistDetail implements OnInit {
  artist$: Observable<Artist | undefined>;
  albums$: Observable<Album[]>;
  songs$: Observable<Song[]>;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService,
    private playerService: PlayerService
  ) {
    const artistId$ = this.route.params.pipe(
      map(params => params['id'])
    );

    this.artist$ = artistId$.pipe(
      switchMap(id => this.musicDataService.getArtistById(id))
    );

    this.albums$ = artistId$.pipe(
      switchMap(id => this.musicDataService.getAlbumsByArtist(id))
    );

    this.songs$ = artistId$.pipe(
      switchMap(id => this.musicDataService.getSongsByArtist(id))
    );
  }

  ngOnInit(): void {}

  playSong(song: Song): void {
    this.playerService.playSong(song);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
