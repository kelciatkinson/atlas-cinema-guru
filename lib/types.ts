export interface TitleType {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image?: string;
  favorited?: boolean;
  watchLater?: boolean;
}
