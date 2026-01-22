import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaylistService } from '../services/playlist.service';
import { MusicDataService } from '../services/music-data.service';
import { Playlist } from '../models/playlist.interface';
import { Song } from '../models/song.interface';

interface PlaylistWithSongs extends Playlist {
  songs: Song[];
}

@Component({
  selector: 'app-playlist-manager',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule
  ],
  templateUrl: './playlist-manager.html',
  styleUrl: './playlist-manager.css',
})
export class PlaylistManager implements OnInit {
  playlists$: Observable<PlaylistWithSongs[]>;
  allSongs$: Observable<Song[]>;
  playlistForm: FormGroup;
  editingPlaylist: Playlist | null = null;
  showForm = false;

  constructor(
    private playlistService: PlaylistService,
    private musicDataService: MusicDataService,
    private fb: FormBuilder
  ) {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      songIds: [[]]
    });

    this.allSongs$ = this.musicDataService.getSongs();

    this.playlists$ = combineLatest([
      this.playlistService.getPlaylists(),
      this.musicDataService.getSongs()
    ]).pipe(
      map(([playlists, songs]) => {
        return playlists.map(playlist => ({
          ...playlist,
          songs: playlist.songIds.map(id => songs.find(s => s.id === id)).filter((s): s is Song => s !== undefined)
        }));
      })
    );
  }

  ngOnInit(): void {}

  createPlaylist(): void {
    this.editingPlaylist = null;
    this.playlistForm.reset({ name: '', description: '', songIds: [] });
    this.showForm = true;
  }

  editPlaylist(playlist: Playlist): void {
    this.editingPlaylist = playlist;
    this.playlistForm.patchValue({
      name: playlist.name,
      description: playlist.description || '',
      songIds: playlist.songIds
    });
    this.showForm = true;
  }

  deletePlaylist(id: string): void {
    if (confirm('Are you sure you want to delete this playlist?')) {
      this.playlistService.deletePlaylist(id);
    }
  }

  savePlaylist(): void {
    if (this.playlistForm.valid) {
      const formValue = this.playlistForm.value;
      
      if (this.editingPlaylist) {
        const updated: Playlist = {
          ...this.editingPlaylist,
          name: formValue.name,
          description: formValue.description,
          songIds: formValue.songIds
        };
        this.playlistService.updatePlaylist(updated);
      } else {
        const newPlaylist = this.playlistService.createPlaylist(formValue.name, formValue.description);
        if (formValue.songIds && formValue.songIds.length > 0) {
          formValue.songIds.forEach((songId: string) => {
            this.playlistService.addSongToPlaylist(newPlaylist.id, songId);
          });
        }
      }
      
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingPlaylist = null;
    this.playlistForm.reset();
  }

  removeSongFromPlaylist(playlistId: string, songId: string): void {
    this.playlistService.removeSongFromPlaylist(playlistId, songId);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
