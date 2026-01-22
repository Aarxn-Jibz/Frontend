import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../models/song.interface';

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerStateSubject = new BehaviorSubject<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0
  });

  public playerState$: Observable<PlayerState> = this.playerStateSubject.asObservable();
  private audioElement: HTMLAudioElement | null = null;

  constructor() {}

  setAudioElement(audio: HTMLAudioElement): void {
    this.audioElement = audio;
    this.setupAudioListeners();
  }

  private setupAudioListeners(): void {
    if (!this.audioElement) return;

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.updateCurrentTime(this.audioElement.currentTime);
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.audioElement) {
        this.updateDuration(this.audioElement.duration);
      }
    });

    this.audioElement.addEventListener('ended', () => {
      this.pause();
    });
  }

  playSong(song: Song): void {
    const currentState = this.playerStateSubject.value;
    
    if (currentState.currentSong?.id === song.id && this.audioElement) {
      this.play();
    } else {
      this.playerStateSubject.next({
        ...currentState,
        currentSong: song,
        isPlaying: false,
        currentTime: 0,
        duration: 0
      });
      
      if (this.audioElement) {
        this.audioElement.src = song.url;
        this.audioElement.load();
        this.play();
      }
    }
  }

  play(): void {
    if (this.audioElement) {
      this.audioElement.play().then(() => {
        this.playerStateSubject.next({
          ...this.playerStateSubject.value,
          isPlaying: true
        });
      }).catch(() => {
        // Handle play error (e.g., audio file not found)
        console.warn('Could not play audio');
      });
    }
  }

  pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.playerStateSubject.next({
        ...this.playerStateSubject.value,
        isPlaying: false
      });
    }
  }

  togglePlayPause(): void {
    const currentState = this.playerStateSubject.value;
    if (currentState.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  private updateCurrentTime(time: number): void {
    this.playerStateSubject.next({
      ...this.playerStateSubject.value,
      currentTime: time
    });
  }

  private updateDuration(duration: number): void {
    this.playerStateSubject.next({
      ...this.playerStateSubject.value,
      duration: duration
    });
  }

  seekTo(time: number): void {
    if (this.audioElement) {
      this.audioElement.currentTime = time;
      this.updateCurrentTime(time);
    }
  }
}
