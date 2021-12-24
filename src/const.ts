export enum AppRoute {
  Main = '/',
  Product = '/guitars/:id',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  Comment = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
  Query = '/guitars?:query',
}

export enum SortMethods {
  Default = '',
}

export enum SortQuery {
  SortToBiggerPrice = '&_sort=price&_order=asc',
  SortToLesserPrice = '&_sort=price&_order=desc',
  SortToBiggerRating = '&_sort=rating&_order=asc',
  SortToLesserRating = '&_sort=rating&_order=desc',
}

export enum FilterQuery {
  Acoustic = '&type=acoustic',
  Electric = '&type=electric',
  Ukulele = '&type=ukulele',
  FourString = '&stringCount=4',
  SixString = '&stringCount=6',
  SevenString = '&stringCount=7',
  TwelveString = '&stringCount=12',
}
