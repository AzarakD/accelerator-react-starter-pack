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

export enum FilterQuery {
  Acoustic = '&type=acoustic',
  Electric = '&type=electric',
  Ukulele = '&type=ukulele',
}
