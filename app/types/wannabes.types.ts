export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String']['output'];
  lastPost: Maybe<Post>;
  name: Maybe<Scalars['String']['output']>;
  postCount: Maybe<Scalars['Int']['output']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']['output']>;
  similar: Maybe<ArtistList>;
  slug: Scalars['String']['output'];
  spotifyFollowers: Maybe<Scalars['Int']['output']>;
  spotifyGenres: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  spotifyPopularity: Maybe<Scalars['Int']['output']>;
};


export type ArtistPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type ArtistSimilarArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtistList = {
  __typename?: 'ArtistList';
  data: Maybe<Array<Maybe<Artist>>>;
  pagination: Maybe<Pagination>;
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type Dimensions = {
  __typename?: 'Dimensions';
  height: Maybe<Scalars['Int']['output']>;
  width: Maybe<Scalars['Int']['output']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String']['output'];
  lastPost: Maybe<Post>;
  name: Maybe<Scalars['String']['output']>;
  postCount: Maybe<Scalars['Int']['output']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']['output']>;
  slug: Maybe<Scalars['String']['output']>;
};


export type EventPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type EventList = {
  __typename?: 'EventList';
  data: Maybe<Array<Maybe<Event>>>;
  pagination: Maybe<Pagination>;
};

export type Image = {
  __typename?: 'Image';
  blurhash: Maybe<Scalars['String']['output']>;
  dimensions: Maybe<Dimensions>;
  hires: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  photographer: Maybe<Photographer>;
  resized: Maybe<Scalars['String']['output']>;
  tiny: Maybe<Scalars['String']['output']>;
};


export type ImageBlurhashArgs = {
  square: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageResizedArgs = {
  height: Scalars['Int']['input'];
  square: InputMaybe<Scalars['Boolean']['input']>;
  width: Scalars['Int']['input'];
};


export type ImageTinyArgs = {
  square: InputMaybe<Scalars['Boolean']['input']>;
};

export type LetterPart = {
  __typename?: 'LetterPart';
  artistCount: Maybe<Scalars['Int']['output']>;
  artists: Maybe<Array<Maybe<Artist>>>;
  firstArtist: Maybe<Artist>;
  firstLetter: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastArtist: Maybe<Artist>;
  lastLetter: Maybe<Scalars['String']['output']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  limit: Maybe<Scalars['Int']['output']>;
  start: Maybe<Scalars['Int']['output']>;
  total: Maybe<Scalars['Int']['output']>;
};

export type Photographer = {
  __typename?: 'Photographer';
  active: Maybe<Scalars['Boolean']['output']>;
  bestof: Maybe<PostList>;
  email: Maybe<Scalars['String']['output']>;
  facebook: Maybe<Scalars['String']['output']>;
  firstName: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Image>;
  instagram: Maybe<Scalars['String']['output']>;
  lastName: Maybe<Scalars['String']['output']>;
  lastPost: Maybe<Post>;
  postCount: Maybe<Scalars['Int']['output']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  startYear: Maybe<Scalars['String']['output']>;
  twitter: Maybe<Scalars['String']['output']>;
  website: Maybe<Scalars['String']['output']>;
};


export type PhotographerBestofArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type PhotographerPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type PhotographerList = {
  __typename?: 'PhotographerList';
  data: Maybe<Array<Maybe<Photographer>>>;
  pagination: Maybe<Pagination>;
};

export type Post = {
  __typename?: 'Post';
  artist: Maybe<Artist>;
  date: Maybe<Scalars['Date']['output']>;
  event: Maybe<Event>;
  id: Scalars['ID']['output'];
  images: Maybe<Array<Maybe<Image>>>;
  photographers: Maybe<Array<Maybe<Photographer>>>;
  searchScore: Maybe<Scalars['Float']['output']>;
  slug: Scalars['String']['output'];
  thumbnail: Maybe<Image>;
  timestamp: Maybe<Scalars['Int']['output']>;
  url: Maybe<Scalars['String']['output']>;
  venue: Maybe<Venue>;
};

export type PostList = {
  __typename?: 'PostList';
  data: Maybe<Array<Maybe<Post>>>;
  pagination: Maybe<Pagination>;
};

export type Query = {
  __typename?: 'Query';
  allSlugs: Maybe<Slugs>;
  artist: Maybe<Artist>;
  artists: Maybe<ArtistList>;
  artistsSplittedInLetterParts: Maybe<Array<Maybe<LetterPart>>>;
  artistsStartingWithLetter: Maybe<Array<Maybe<Artist>>>;
  bestof: Maybe<PostList>;
  event: Maybe<Event>;
  events: Maybe<EventList>;
  photographer: Maybe<Photographer>;
  photographers: Maybe<PhotographerList>;
  post: Maybe<Post>;
  postSearch: Maybe<PostList>;
  posts: Maybe<PostList>;
  randomPost: Maybe<PostList>;
  search: Maybe<SearchResult>;
  stats: Maybe<Stats>;
  venue: Maybe<Venue>;
  venues: Maybe<VenueList>;
};


export type QueryArtistArgs = {
  id: InputMaybe<Scalars['String']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryArtistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryArtistsSplittedInLetterPartsArgs = {
  amount: InputMaybe<Scalars['Int']['input']>;
};


export type QueryArtistsStartingWithLetterArgs = {
  letter: InputMaybe<Scalars['String']['input']>;
};


export type QueryBestofArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEventArgs = {
  id: InputMaybe<Scalars['String']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPhotographerArgs = {
  id: InputMaybe<Scalars['String']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryPhotographersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyActive?: InputMaybe<Scalars['Boolean']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostArgs = {
  id: InputMaybe<Scalars['String']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostSearchArgs = {
  all: InputMaybe<Scalars['String']['input']>;
  artist: InputMaybe<Scalars['String']['input']>;
  artistId: InputMaybe<Scalars['String']['input']>;
  artistSlug: InputMaybe<Scalars['String']['input']>;
  event: InputMaybe<Scalars['String']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
  eventSlug: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  photographer: InputMaybe<Scalars['String']['input']>;
  photographerId: InputMaybe<Scalars['String']['input']>;
  photographerSlug: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Boolean']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  venue: InputMaybe<Scalars['String']['input']>;
  venueId: InputMaybe<Scalars['String']['input']>;
  venueSlug: InputMaybe<Scalars['String']['input']>;
  year: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRandomPostArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  q: InputMaybe<Scalars['String']['input']>;
  random?: InputMaybe<Scalars['Boolean']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryVenueArgs = {
  id: InputMaybe<Scalars['String']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
};


export type QueryVenuesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  artists: Maybe<ArtistList>;
  events: Maybe<EventList>;
  photographers: Maybe<PhotographerList>;
  posts: Maybe<PostList>;
  venues: Maybe<VenueList>;
};


export type SearchResultArtistsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  start: InputMaybe<Scalars['Int']['input']>;
};


export type SearchResultEventsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  start: InputMaybe<Scalars['Int']['input']>;
};


export type SearchResultPhotographersArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  start: InputMaybe<Scalars['Int']['input']>;
};


export type SearchResultPostsArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  start: InputMaybe<Scalars['Int']['input']>;
};


export type SearchResultVenuesArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  start: InputMaybe<Scalars['Int']['input']>;
};

export type Slugs = {
  __typename?: 'Slugs';
  artists: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  events: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  photographers: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  posts: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  venues: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Stats = {
  __typename?: 'Stats';
  artistCount: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  photographerCount: Maybe<Scalars['Int']['output']>;
  postCount: Maybe<Scalars['Int']['output']>;
  venueCount: Maybe<Scalars['Int']['output']>;
};


export type StatsPhotographerCountArgs = {
  onlyActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Venue = {
  __typename?: 'Venue';
  id: Scalars['String']['output'];
  lastPost: Maybe<Post>;
  name: Maybe<Scalars['String']['output']>;
  postCount: Maybe<Scalars['Int']['output']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']['output']>;
  slug: Scalars['String']['output'];
};


export type VenuePostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type VenueList = {
  __typename?: 'VenueList';
  data: Maybe<Array<Maybe<Venue>>>;
  pagination: Maybe<Pagination>;
};

export type SearchQueryVariables = Exact<{
  start: InputMaybe<Scalars['Int']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  all: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchQuery = { __typename?: 'Query', posts: { __typename?: 'PostList', data: Array<{ __typename?: 'Post', id: string, date: any, slug: string, artist: { __typename?: 'Artist', name: string }, images: Array<{ __typename?: 'Image', blurhash: string, resized: string, photographer: { __typename?: 'Photographer', firstName: string } }>, thumbnail: { __typename?: 'Image', blurhash: string, hires: string, photographer: { __typename?: 'Photographer', firstName: string }, dimensions: { __typename?: 'Dimensions', width: number, height: number } }, venue: { __typename?: 'Venue', id: string, name: string }, event: { __typename?: 'Event', name: string } }>, pagination: { __typename?: 'Pagination', start: number, limit: number, total: number } } };

export type AlbumQueryVariables = Exact<{
  slug: InputMaybe<Scalars['String']['input']>;
}>;


export type AlbumQuery = { __typename?: 'Query', post: { __typename?: 'Post', date: any, id: string, url: string, thumbnail: { __typename?: 'Image', resized: string, photographer: { __typename?: 'Photographer', firstName: string } }, artist: { __typename?: 'Artist', name: string, slug: string }, venue: { __typename?: 'Venue', name: string, slug: string }, event: { __typename?: 'Event', name: string }, images: Array<{ __typename?: 'Image', blurhash: string, hires: string, dimensions: { __typename?: 'Dimensions', width: number, height: number }, photographer: { __typename?: 'Photographer', firstName: string } }> } };

export type RelatedPostsQueryVariables = Exact<{
  artistSlug: InputMaybe<Scalars['String']['input']>;
  venueSlug: InputMaybe<Scalars['String']['input']>;
}>;


export type RelatedPostsQuery = { __typename?: 'Query', sameArtist: { __typename?: 'PostList', data: Array<{ __typename?: 'Post', id: string, slug: string, date: any, venue: { __typename?: 'Venue', name: string }, artist: { __typename?: 'Artist', name: string }, thumbnail: { __typename?: 'Image', hires: string, blurhash: string, photographer: { __typename?: 'Photographer', firstName: string }, dimensions: { __typename?: 'Dimensions', width: number, height: number } }, images: Array<{ __typename?: 'Image', blurhash: string, resized: string, photographer: { __typename?: 'Photographer', firstName: string } }>, event: { __typename?: 'Event', name: string } }> }, sameVenue: { __typename?: 'PostList', data: Array<{ __typename?: 'Post', id: string, slug: string, date: any, venue: { __typename?: 'Venue', name: string }, artist: { __typename?: 'Artist', name: string }, thumbnail: { __typename?: 'Image', hires: string, blurhash: string, photographer: { __typename?: 'Photographer', firstName: string }, dimensions: { __typename?: 'Dimensions', width: number, height: number } }, images: Array<{ __typename?: 'Image', blurhash: string, resized: string, photographer: { __typename?: 'Photographer', firstName: string } }>, event: { __typename?: 'Event', name: string } }> } };

export type RelatedPostFieldsFragment = { __typename?: 'Post', id: string, slug: string, date: any, venue: { __typename?: 'Venue', name: string }, artist: { __typename?: 'Artist', name: string }, thumbnail: { __typename?: 'Image', hires: string, blurhash: string, photographer: { __typename?: 'Photographer', firstName: string }, dimensions: { __typename?: 'Dimensions', width: number, height: number } }, images: Array<{ __typename?: 'Image', blurhash: string, resized: string, photographer: { __typename?: 'Photographer', firstName: string } }>, event: { __typename?: 'Event', name: string } };
