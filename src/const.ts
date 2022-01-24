export const HEADER = 'x-total-count';
export const DEFAULT_PAGE = 1;
export const ITEM_COUNT = 9;

export enum AppRoute {
  Main = '/',
  Product = '/guitars/:id',
  Cart = '/cart',
}

export enum APIRoute {
  Guitars = '/guitars:query&_embed=comments',
  Guitar = '/guitars/:id?&_embed=comments',
  Comments = '/guitars/:id/comments',
  Comment = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum SortQuery {
  SortToBiggerPrice = '&_sort=price&_order=asc',
  SortToLesserPrice = '&_sort=price&_order=desc',
  SortToBiggerRating = '&_sort=rating&_order=asc',
  SortToLesserRating = '&_sort=rating&_order=desc',
  SortToLaterDate = '?_sort=createAt&_order=desc',
  Default = '',
}

export enum FilterQuery {
  Acoustic = '&type=acoustic',
  Electric = '&type=electric',
  Ukulele = '&type=ukulele',
  FourString = '&stringCount=4',
  SixString = '&stringCount=6',
  SevenString = '&stringCount=7',
  TwelveString = '&stringCount=12',
  Default = '',
}

export enum SearchQuery {
  Similar = '&name_like=',
  Default = '',
}

export enum PlaceholderQuery {
  Min = 'guitars?&_sort=price&_order=asc&_start=0&_limit=1',
  Max = 'guitars?&_sort=price&_order=desc&_start=0&_limit=1',
}

export enum PageQuery {
  Start = '&_start=',
  Limit = '&_limit=',
}

export enum QueryKey {
  PriceMin = 'price_gte=',
  PriceMax = 'price_lte=',
  SortPrice = '_sort=price',
  SortRating = '_sort=rating',
  OrderAsc = '_order=asc',
  OrderDesc = '_order=desc',
  Page = 'page_',
}

export enum RateValue {
  Terrible = 1,
  Bad = 2,
  Fine = 3,
  Good = 4,
  Great = 5,
}
