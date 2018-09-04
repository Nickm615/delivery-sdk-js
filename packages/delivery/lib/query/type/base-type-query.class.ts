import { Observable } from 'rxjs';

import { IDeliveryClientConfig } from '../../config';
import {
  ICloudResponse,
  IContentTypeQueryConfig,
  IQueryParameter
} from '../../interfaces';
import { TypeResponses } from '../../models';
import { QueryService } from '../../services';
import { BaseQuery } from '../common/base-query.class';
import { IHeader } from 'kentico-cloud-core';

export abstract class BaseTypeQuery<
  TResponse extends ICloudResponse
> extends BaseQuery<TResponse> {
  protected parameters: IQueryParameter[] = [];
  protected _queryConfig: IContentTypeQueryConfig = {};

  constructor(
    protected config: IDeliveryClientConfig,
    protected queryService: QueryService
  ) {
    super(config, queryService);
  }

  /**
   * Used to configure query
   * @param queryConfig Query configuration
   */
  queryConfig(queryConfig: IContentTypeQueryConfig): this {
    this._queryConfig = queryConfig;
    return this;
  }

  /**
   * Gets headers used by this query
   */
  getHeaders(): IHeader[] {
    return this.queryService.getHeaders(this._queryConfig);
  }

  protected getSingleTypeQueryUrl(codename: string): string {
    const action = '/types/' + codename;

    return super.resolveUrlInternal(action);
  }

  protected getMultipleTypesQueryUrl(): string {
    const action = '/types';

    return super.resolveUrlInternal(action);
  }

  protected runMultipleTypesQuery(): Observable<
    TypeResponses.DeliveryTypeListingResponse
  > {
    return this.queryService.getMultipleTypes(
      this.getMultipleTypesQueryUrl(),
      this._queryConfig
    );
  }

  protected runSingleTypeQuery(
    codename: string
  ): Observable<TypeResponses.DeliveryTypeResponse> {
    return this.queryService.getSingleType(
      this.getSingleTypeQueryUrl(codename),
      this._queryConfig
    );
  }
}
