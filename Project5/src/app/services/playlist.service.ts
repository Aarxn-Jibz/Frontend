import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Playlist } from '../models/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistsSubject = new BehaviorSubject<Playlist[]>([]);
  public playlists$: Observable<Playlist[]> = this.playlistsSubject.asObservable();

  constructor() {
    // Initialize with empty array or load from localStorage
    this.loadPlaylists();
  }

  private loadPlaylists(): void {
    const stored = localStorage.getItem('playlists');
    if (stored) {
      try {
        const playlists = JSON.parse(stored);
        this.playlistsSubject.next(playlists);
      } catch (e) {
        console.error('Error loading playlists from localStorage', e);
      }
    }
  }

  private savePlaylists(playlists: Playlist[]): void {
    localStorage.setItem('playlists', JSON.stringify(playlists));
    this.playlistsSubject.next(playlists);
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.playlists$;
  }

  getPlaylistById(id: string): Observable<Playlist | undefined> {
    return this.playlists$.pipe(
      map(playlists => playlists.find(p => p.id === id))
    );
  }

  createPlaylist(name: string, description?: string): Playlist {
    const newPlaylist: Playlist = {
      id: this.generateId(),
      name,
      description,
      songIds: [],
      createdAt: new Date().toISOString()
    };

    const currentPlaylists = this.playlistsSubject.value;
    this.savePlaylists([...currentPlaylists, newPlaylist]);
    return newPlaylist;
  }

  updatePlaylist(playlist: Playlist): void {
    const currentPlaylists = this.playlistsSubject.value;
    const index = currentPlaylists.findIndex(p => p.id === playlist.id);
    
    if (index !== -1) {
      const updated = [...currentPlaylists];
      updated[index] = playlist;
      this.savePlaylists(updated);
    }
  }

  deletePlaylist(id: string): void {
    const currentPlaylists = this.playlistsSubject.value;
    this.savePlaylists(currentPlaylists.filter(p => p.id !== id));
  }

  addSongToPlaylist(playlistId: string, songId: string): void {
    const currentPlaylists = this.playlistsSubject.value;
    const playlist = currentPlaylists.find(p => p.id === playlistId);
    
    if (playlist && !playlist.songIds.includes(songId)) {
      playlist.songIds.push(songId);
      this.updatePlaylist(playlist);
    }
  }

  removeSongFromPlaylist(playlistId: string, songId: string): void {
    const currentPlaylists = this.playlistsSubject.value;
    const playlist = currentPlaylists.find(p => p.id === playlistId);
    
    if (playlist) {
      playlist.songIds = playlist.songIds.filter(id => id !== songId);
      this.updatePlaylist(playlist);
    }
  }

  private generateId(): string {
    return `playlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
