/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export namespace Ad {
  /**
   * No description
   * @tags ad
   * @name Create
   * @request POST:/ad/create/
   * @response `200` `void` Default Response
   */
  export namespace Create {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
      name?: string | null;
      type?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      breed?: string;
      description?: string;
      email?: string;
      tel?: string;
      price?: number;
    };
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags ad
   * @name FindMany
   * @request GET:/ad/find-many/
   * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, description: string, email: string, tel?: string, isPublished: string })[]` Default Response
   */
  export namespace FindMany {
    export type RequestParams = {};
    export type RequestQuery = { cursor?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      type: string;
      breed: string;
      description: string;
      email: string;
      tel?: string;
      isPublished: string;
    }[];
  }
  /**
   * No description
   * @tags ad
   * @name New
   * @request POST:/ad/new/
   * @response `201` `{ id: number }` Default Response
   */
  export namespace New {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = { authentication: string };
    export type ResponseBody = { id: number };
  }
  /**
   * No description
   * @tags ad
   * @name PreviewList
   * @request GET:/ad/preview-list/
   * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, price: number })[]` Default Response
   */
  export namespace PreviewList {
    export type RequestParams = {};
    export type RequestQuery = {
      cursor?: number;
      searchName?: string;
      searchBreed?: string;
      searchType?: string;
      ltePrice?: number;
      gtePrice?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      type: string;
      breed: string;
      price: number;
    }[];
  }
  /**
   * No description
   * @tags ad
   * @name Update
   * @request PATCH:/ad/update/
   * @response `200` `void` Default Response
   */
  export namespace Update {
    export type RequestParams = {};
    export type RequestQuery = { id: number };
    export type RequestBody = {
      name?: string | null;
      type?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      breed?: string;
      description?: string;
      email?: string;
      tel?: string;
      price?: number;
    };
    export type RequestHeaders = { authentication: string };
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags ad
   * @name UpdateData
   * @request GET:/ad/update-data/
   * @response `200` `{ name: string | null, type: "cat" | "dog" | "bird" | "aquarium" | "rodent", breed: string, description: string, email: string, tel: string, price: number, id: number }` Default Response
   */
  export namespace UpdateData {
    export type RequestParams = {};
    export type RequestQuery = { adId: number };
    export type RequestBody = never;
    export type RequestHeaders = { authentication: string };
    export type ResponseBody = {
      name: string | null;
      type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      breed: string;
      description: string;
      email: string;
      tel: string;
      price: number;
      id: number;
    };
  }
}

export namespace Auth {
  /**
   * No description
   * @tags auth
   * @name Login
   * @request POST:/auth/login/
   * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { password: string; email: string };
    export type RequestHeaders = {};
    export type ResponseBody = { user: { email: string; name: string; id: string }; token: string };
  }
  /**
   * No description
   * @tags auth
   * @name Register
   * @request POST:/auth/register/
   * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
   */
  export namespace Register {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { password: string; email: string; name: string };
    export type RequestHeaders = {};
    export type ResponseBody = { user: { email: string; name: string; id: string }; token: string };
  }
  /**
   * No description
   * @tags auth
   * @name Update
   * @request PATCH:/auth/update/
   * @response `200` `void` Default Response
   */
  export namespace Update {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { email?: string; name?: string; tel?: string };
    export type RequestHeaders = { authentication: string };
    export type ResponseBody = void;
  }
}

export namespace Image {
  /**
   * No description
   * @tags image
   * @name Upload
   * @request POST:/image/upload/
   * @response `201` `void` Default Response
   */
  export namespace Upload {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = any;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title In Good Hands API
 * @version 0.1.0
 * @baseUrl http://localhost:8000
 * @externalDocs https://swagger.io
 *
 * Swagger API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetRoot
   * @request GET:/
   * @response `200` `void` Default Response
   */
  getRoot = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  ad = {
    /**
     * No description
     *
     * @tags ad
     * @name Create
     * @request POST:/ad/create/
     * @response `200` `void` Default Response
     */
    create: (
      data: {
        name?: string | null;
        type?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        breed?: string;
        description?: string;
        email?: string;
        tel?: string;
        price?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ad/create/`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name FindMany
     * @request GET:/ad/find-many/
     * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, description: string, email: string, tel?: string, isPublished: string })[]` Default Response
     */
    findMany: (query?: { cursor?: string }, params: RequestParams = {}) =>
      this.request<
        {
          id: number;
          createdAt: string;
          updatedAt: string;
          name: string;
          type: string;
          breed: string;
          description: string;
          email: string;
          tel?: string;
          isPublished: string;
        }[],
        any
      >({
        path: `/ad/find-many/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name New
     * @request POST:/ad/new/
     * @response `201` `{ id: number }` Default Response
     */
    new: (params: RequestParams = {}) =>
      this.request<{ id: number }, any>({
        path: `/ad/new/`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name PreviewList
     * @request GET:/ad/preview-list/
     * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, price: number })[]` Default Response
     */
    previewList: (
      query?: {
        cursor?: number;
        searchName?: string;
        searchBreed?: string;
        searchType?: string;
        ltePrice?: number;
        gtePrice?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          createdAt: string;
          updatedAt: string;
          name: string;
          type: string;
          breed: string;
          price: number;
        }[],
        any
      >({
        path: `/ad/preview-list/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name Update
     * @request PATCH:/ad/update/
     * @response `200` `void` Default Response
     */
    update: (
      query: { id: number },
      body: {
        name?: string | null;
        type?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        breed?: string;
        description?: string;
        email?: string;
        tel?: string;
        price?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ad/update/`,
        method: "PATCH",
        query: query,
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name UpdateData
     * @request GET:/ad/update-data/
     * @response `200` `{ name: string | null, type: "cat" | "dog" | "bird" | "aquarium" | "rodent", breed: string, description: string, email: string, tel: string, price: number, id: number }` Default Response
     */
    updateData: (query: { adId: number }, params: RequestParams = {}) =>
      this.request<
        {
          name: string | null;
          type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
          breed: string;
          description: string;
          email: string;
          tel: string;
          price: number;
          id: number;
        },
        any
      >({
        path: `/ad/update-data/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name Login
     * @request POST:/auth/login/
     * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
     */
    login: (body: { password: string; email: string }, params: RequestParams = {}) =>
      this.request<{ user: { email: string; name: string; id: string }; token: string }, any>({
        path: `/auth/login/`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name Register
     * @request POST:/auth/register/
     * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
     */
    register: (body: { password: string; email: string; name: string }, params: RequestParams = {}) =>
      this.request<{ user: { email: string; name: string; id: string }; token: string }, any>({
        path: `/auth/register/`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name Update
     * @request PATCH:/auth/update/
     * @response `200` `void` Default Response
     */
    update: (body: { email?: string; name?: string; tel?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/update/`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
  image = {
    /**
     * No description
     *
     * @tags image
     * @name Upload
     * @request POST:/image/upload/
     * @response `201` `void` Default Response
     */
    upload: (data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/image/upload/`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  };
}
