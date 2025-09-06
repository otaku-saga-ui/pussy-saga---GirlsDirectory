import type { Media } from './Media';

export interface Character {
  id: number;
  name: string;
  mediaURL: string;
  media: Media[];
}
