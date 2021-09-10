import { ContentItem } from '../models';
import {
    ElementQuery,
    ItemsFeedQuery,
    MultipleItemsQuery,
    MultipleTypeQuery,
    SingleItemQuery,
    SingleTypeQuery,
    TaxonomiesQuery,
    TaxonomyQuery,
    LanguagesQuery,
} from '../query';
import { IMappingService } from '../services';

export interface IDeliveryClient {
    /**
     * Mapping service - can be used to get strongly typed responses from json result
     */
    mappingService: IMappingService;

    /**
     * Gets query for languages
     */
    languages(): LanguagesQuery;

    /**
     * Gets query for multiple types
     */
    types(): MultipleTypeQuery;

    /**
     * Gets query for single type
     * @param {string} typeCodename - Codename of the type to retrieve
     */
    type(typeCodename: string): SingleTypeQuery;

    /**
     * Gets query for multiple items
     */
    items<TItem extends ContentItem>(): MultipleItemsQuery<TItem>;

    /**
     * Gets query for items feed. Executes single HTTP request only. Might not get all items from your Kontent project.
     */
    itemsFeed<TItem extends ContentItem>(): ItemsFeedQuery<TItem>;

    /**
     * Gets query for single item
     * @param {string} codename - Codename of item to retrieve
     */
    item<TItem extends ContentItem>(codename: string): SingleItemQuery<TItem>;

    /**
     * Gets query for multiple taxonomies
     */
    taxonomies(): TaxonomiesQuery;

    /**
     * Gets query for single item
     * @param {string} codename - Codename of taxonomy to retrieve
     */
    taxonomy(codename: string): TaxonomyQuery;

    /**
     * Gets query for an element within a type
     */
    element(typeCodename: string, elementCodename: string): ElementQuery;
}
