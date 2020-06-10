import { GraphQLResolveInfo } from 'graphql';
export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Artist = {
    __typename?: 'Artist';
    id: Scalars['Int'];
    name: Scalars['String'];
    albums: Array<Maybe<Album>>;
    musics: Array<Maybe<Music>>;
};
export declare type Music = {
    __typename?: 'Music';
    id: Scalars['Int'];
    name: Scalars['String'];
    filePath: Scalars['String'];
    artist?: Maybe<Artist>;
    album?: Maybe<Album>;
};
export declare type Album = {
    __typename?: 'Album';
    id: Scalars['Int'];
    name: Scalars['String'];
    musics: Array<Maybe<Music>>;
    artist: Artist;
};
export declare type Query = {
    __typename?: 'Query';
    musics: Array<Maybe<Music>>;
    albums: Array<Maybe<Album>>;
    artists: Array<Maybe<Artist>>;
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    String: ResolverTypeWrapper<Scalars['String']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Artist: ResolverTypeWrapper<Artist>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Music: ResolverTypeWrapper<Music>;
    Album: ResolverTypeWrapper<Album>;
    Query: ResolverTypeWrapper<{}>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    String: Scalars['String'];
    Boolean: Scalars['Boolean'];
    Artist: Artist;
    Int: Scalars['Int'];
    Music: Music;
    Album: Album;
    Query: {};
};
export declare type ArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    albums?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType>;
    musics?: Resolver<Array<Maybe<ResolversTypes['Music']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};
export declare type MusicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Music'] = ResolversParentTypes['Music']> = {
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    filePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
    album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};
export declare type AlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    musics?: Resolver<Array<Maybe<ResolversTypes['Music']>>, ParentType, ContextType>;
    artist?: Resolver<ResolversTypes['Artist'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    musics?: Resolver<Array<Maybe<ResolversTypes['Music']>>, ParentType, ContextType>;
    albums?: Resolver<Array<Maybe<ResolversTypes['Album']>>, ParentType, ContextType>;
    artists?: Resolver<Array<Maybe<ResolversTypes['Artist']>>, ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
    Artist?: ArtistResolvers<ContextType>;
    Music?: MusicResolvers<ContextType>;
    Album?: AlbumResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
};
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
//# sourceMappingURL=graphql.d.ts.map