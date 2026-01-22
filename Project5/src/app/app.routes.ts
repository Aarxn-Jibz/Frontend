import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/songs',
    pathMatch: 'full'
  },
  {
    path: 'songs',
    loadComponent: () => import('./song-list/song-list').then(m => m.SongList)
  },
  {
    path: 'playlists',
    loadComponent: () => import('./playlist-manager/playlist-manager').then(m => m.PlaylistManager)
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./artist-detail/artist-detail').then(m => m.ArtistDetail)
  }
];
