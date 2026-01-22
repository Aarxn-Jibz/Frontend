export interface Song {
  id: string;
  title: string;
  artistId: string;
  albumId: string;
  duration: number; // in seconds
  url: string; // path to audio file or placeholder
  coverArt?: string;
}
