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
  SortToBiggerPrice = 'sortToBiggerPrice',
  SortToLesserPrice = 'sortToLesserPrice',
  SortToBiggerRating = 'sortToBiggerRating',
  SortToLesserRating = 'sortToLesserRating',
  Default = 'default',
}

export enum SortQuery {
  SortToBiggerPrice = '/guitars?_sort=price&_order=asc',
  SortToLesserPrice = '/guitars?_sort=price&_order=desc',
  SortToBiggerRating = '/guitars?_sort=rating&_order=asc',
  SortToLesserRating = '/guitars?_sort=rating&_order=desc',
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
