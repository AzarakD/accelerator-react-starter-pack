import { Comment } from './comment';

export type GuitarType = {
  acoustic: 'Акустическая',
  electric: 'Электрическая',
  ukulele: 'Укулеле',
};

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: keyof GuitarType,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: Comment[],
};

// export type GuitarWithComments = Guitar & {comments: Comment[]};
