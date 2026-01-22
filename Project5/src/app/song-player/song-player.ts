import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PlayerService, PlayerState } from '../services/player.service';
import { MusicDataService } from '../services/music-data.service';
import { Song } from '../models/song.interface';
import { Artist } from '../models/artist.interface';
import { Album } from '../models/album.interface';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-song-player',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
  ],
  templateUrl: './song-player.html',
  styleUrl: './song-player.css',
})
export class SongPlayer implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('audioElement') audioElementRef!: ElementRef<HTMLAudioElement>;
  
  playerState$: Observable<PlayerState>;
  songDetails$: Observable<{ song: Song | null; artist: Artist | undefined; album: Album | undefined }>;
  currentTime: number = 0;
  duration: number = 0;
  isPlaying: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private playerService: PlayerService,
    private musicDataService: MusicDataService
  ) {
    this.playerState$ = this.playerService.playerState$;
    
    this.songDetails$ = combineLatest([
      this.playerState$,
      this.musicDataService.getArtists(),
      this.musicDataService.getAlbums()
    ]).pipe(
      map(([state, artists, albums]) => {
        const song = state.currentSong;
        const artist = song ? artists.find(a => a.id === song.artistId) : undefined;
        const album = song ? albums.find(a => a.id === song.albumId) : undefined;
        return { song, artist, album };
      })
    );
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.playerState$.subscribe(state => {
        this.currentTime = state.currentTime;
        this.duration = state.duration;
        this.isPlaying = state.isPlaying;
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.audioElementRef?.nativeElement) {
      this.playerService.setAudioElement(this.audioElementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  togglePlayPause(): void {
    this.playerService.togglePlayPause();
  }

  onSeek(value: number): void {
    this.playerService.seekTo(value);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
