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

export declare namespace Ad {
  /**
   * No description
   * @tags ad
   * @name AdsIds
   * @request GET:/ad/ads-ids/
   * @response `200` `({ id: number })[]` Default Response
   */
  namespace AdsIds {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
    }[];
  }
  /**
   * No description
   * @tags ad
   * @name MyAds
   * @request GET:/ad/my-ads/
   * @response `200` `({ id: number, createdAt: string, name: string, type: string, breed: string, isPublished: boolean })[]` Default Response
   */
  namespace MyAds {
    type RequestParams = {};
    type RequestQuery = {
      cursor?: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
      createdAt: string;
      name: string;
      type: string;
      breed: string;
      isPublished: boolean;
    }[];
  }
  /**
   * No description
   * @tags ad
   * @name MyAds2
   * @request GET:/ad/my-ads copy/
   * @originalName myAds
   * @duplicate
   * @response `200` `({ id: number, createdAt: string, name: string, type: string, breed: string, isPublished: boolean })[]` Default Response
   */
  namespace MyAds2 {
    type RequestParams = {};
    type RequestQuery = {
      cursor?: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
      createdAt: string;
      name: string;
      type: string;
      breed: string;
      isPublished: boolean;
    }[];
  }
  /**
   * No description
   * @tags ad
   * @name New
   * @request POST:/ad/new/
   * @response `201` `{ id: number }` Default Response
   */
  namespace New {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
    };
  }
  /**
   * No description
   * @tags ad
   * @name PreviewList
   * @request GET:/ad/preview-list/
   * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, price: number, birthday: string, images: ({ id: number, src: string, thumbnail: string })[] })[]` Default Response
   */
  namespace PreviewList {
    type RequestParams = {};
    type RequestQuery = {
      cursor?: number;
      searchName?: string;
      searchBreed?: string;
      searchType?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      ltePrice?: number;
      gtePrice?: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      type: string;
      breed: string;
      price: number;
      birthday: string;
      images: {
        id: number;
        src: string;
        thumbnail: string;
      }[];
    }[];
  }
  /**
   * No description
   * @tags ad
   * @name Update
   * @request PATCH:/ad/update/
   * @response `200` `void` Default Response
   */
  namespace Update {
    type RequestParams = {};
    type RequestQuery = {
      id: number;
    };
    type RequestBody = {
      name: string;
      type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      breed: string;
      description: string;
      email: string;
      tel: string;
      price: number;
      birthday: string;
      isPublished: boolean;
    };
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
   * No description
   * @tags ad
   * @name UpdateData
   * @request GET:/ad/update-data/
   * @response `200` `{ name: string, type: "cat" | "dog" | "bird" | "aquarium" | "rodent", breed: string, description: string, email: string, tel: string, price: number, birthday: string, isPublished: boolean, id: number, images: ({ id: number, src: string, thumbnail: string })[] }` Default Response
   */
  namespace UpdateData {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      name: string;
      type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      breed: string;
      description: string;
      email: string;
      tel: string;
      price: number;
      birthday: string;
      isPublished: boolean;
      id: number;
      images: {
        id: number;
        src: string;
        thumbnail: string;
      }[];
    };
  }
}
export declare namespace Auth {
  /**
   * No description
   * @tags auth
   * @name Login
   * @request POST:/auth/login/
   * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
   */
  namespace Login {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = {
      password: string;
      email: string;
    };
    type RequestHeaders = {};
    type ResponseBody = {
      user: {
        email: string;
        name: string;
        id: string;
      };
      token: string;
    };
  }
  /**
   * No description
   * @tags auth
   * @name Register
   * @request POST:/auth/register/
   * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
   */
  namespace Register {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = {
      password: string;
      email: string;
      name: string;
    };
    type RequestHeaders = {};
    type ResponseBody = {
      user: {
        email: string;
        name: string;
        id: string;
      };
      token: string;
    };
  }
  /**
   * No description
   * @tags auth
   * @name Update
   * @request PATCH:/auth/update/
   * @response `200` `void` Default Response
   */
  namespace Update {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = {
      email?: string;
      name?: string;
      tel?: string;
    };
    type RequestHeaders = {};
    type ResponseBody = void;
  }
}
export declare namespace Image {
  /**
   * No description
   * @tags image
   * @name Delete
   * @request DELETE:/image/delete/
   * @response `201` `void` Default Response
   */
  namespace Delete {
    type RequestParams = {};
    type RequestQuery = {
      imageId: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
   * No description
   * @tags image
   * @name Upload
   * @request POST:/image/upload/
   * @response `201` `{ id: number, src: string, thumbnail: string }` Default Response
   */
  namespace Upload {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = {
      image: File;
    };
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
      src: string;
      thumbnail: string;
    };
  }
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export declare type QueryParamsType = Record<string | number, any>;
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
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}
export declare class HttpClient<SecurityDataType = unknown> {
  instance: AxiosInstance;
  private securityData;
  private securityWorker?;
  private secure?;
  private format?;
  constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  private mergeRequestParams;
  private createFormData;
  request: <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title In Good Hands API
 * @version 0.1.0
 * @baseUrl http://localhost:8000
 * @externalDocs https://swagger.io
 *
 * Swagger API
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetRoot
   * @request GET:/
   * @response `200` `void` Default Response
   */
  getRoot: (params?: RequestParams) => Promise<AxiosResponse<void>>;
  ad: {
    /**
     * No description
     *
     * @tags ad
     * @name AdsIds
     * @request GET:/ad/ads-ids/
     * @response `200` `({ id: number })[]` Default Response
     */
    adsIds: (params?: RequestParams) => Promise<
      AxiosResponse<
        {
          id: number;
        }[]
      >
    >;
    /**
     * No description
     *
     * @tags ad
     * @name MyAds
     * @request GET:/ad/my-ads/
     * @response `200` `({ id: number, createdAt: string, name: string, type: string, breed: string, isPublished: boolean })[]` Default Response
     */
    myAds: (
      query?: {
        cursor?: number;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<
        {
          id: number;
          createdAt: string;
          name: string;
          type: string;
          breed: string;
          isPublished: boolean;
        }[]
      >
    >;
    /**
     * No description
     *
     * @tags ad
     * @name MyAds2
     * @request GET:/ad/my-ads copy/
     * @originalName myAds
     * @duplicate
     * @response `200` `({ id: number, createdAt: string, name: string, type: string, breed: string, isPublished: boolean })[]` Default Response
     */
    myAds2: (
      query?: {
        cursor?: number;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<
        {
          id: number;
          createdAt: string;
          name: string;
          type: string;
          breed: string;
          isPublished: boolean;
        }[]
      >
    >;
    /**
     * No description
     *
     * @tags ad
     * @name New
     * @request POST:/ad/new/
     * @response `201` `{ id: number }` Default Response
     */
    new: (params?: RequestParams) => Promise<
      AxiosResponse<{
        id: number;
      }>
    >;
    /**
     * No description
     *
     * @tags ad
     * @name PreviewList
     * @request GET:/ad/preview-list/
     * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, price: number, birthday: string, images: ({ id: number, src: string, thumbnail: string })[] })[]` Default Response
     */
    previewList: (
      query?: {
        cursor?: number;
        searchName?: string;
        searchBreed?: string;
        searchType?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        ltePrice?: number;
        gtePrice?: number;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<
        {
          id: number;
          createdAt: string;
          updatedAt: string;
          name: string;
          type: string;
          breed: string;
          price: number;
          birthday: string;
          images: {
            id: number;
            src: string;
            thumbnail: string;
          }[];
        }[]
      >
    >;
    /**
     * No description
     *
     * @tags ad
     * @name Update
     * @request PATCH:/ad/update/
     * @response `200` `void` Default Response
     */
    update: (
      query: {
        id: number;
      },
      body: {
        name: string;
        type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        breed: string;
        description: string;
        email: string;
        tel: string;
        price: number;
        birthday: string;
        isPublished: boolean;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<void>>;
    /**
     * No description
     *
     * @tags ad
     * @name UpdateData
     * @request GET:/ad/update-data/
     * @response `200` `{ name: string, type: "cat" | "dog" | "bird" | "aquarium" | "rodent", breed: string, description: string, email: string, tel: string, price: number, birthday: string, isPublished: boolean, id: number, images: ({ id: number, src: string, thumbnail: string })[] }` Default Response
     */
    updateData: (
      query: {
        adId: number;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<{
        name: string;
        type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        breed: string;
        description: string;
        email: string;
        tel: string;
        price: number;
        birthday: string;
        isPublished: boolean;
        id: number;
        images: {
          id: number;
          src: string;
          thumbnail: string;
        }[];
      }>
    >;
  };
  auth: {
    /**
     * No description
     *
     * @tags auth
     * @name Login
     * @request POST:/auth/login/
     * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
     */
    login: (
      body: {
        password: string;
        email: string;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<{
        user: {
          email: string;
          name: string;
          id: string;
        };
        token: string;
      }>
    >;
    /**
     * No description
     *
     * @tags auth
     * @name Register
     * @request POST:/auth/register/
     * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
     */
    register: (
      body: {
        password: string;
        email: string;
        name: string;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<{
        user: {
          email: string;
          name: string;
          id: string;
        };
        token: string;
      }>
    >;
    /**
     * No description
     *
     * @tags auth
     * @name Update
     * @request PATCH:/auth/update/
     * @response `200` `void` Default Response
     */
    update: (
      body: {
        email?: string;
        name?: string;
        tel?: string;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<void>>;
  };
  image: {
    /**
     * No description
     *
     * @tags image
     * @name Delete
     * @request DELETE:/image/delete/
     * @response `201` `void` Default Response
     */
    delete: (
      query: {
        imageId: number;
      },
      params?: RequestParams,
    ) => Promise<AxiosResponse<void>>;
    /**
     * No description
     *
     * @tags image
     * @name Upload
     * @request POST:/image/upload/
     * @response `201` `{ id: number, src: string, thumbnail: string }` Default Response
     */
    upload: (
      query: {
        adId: number;
      },
      data: {
        image: File;
      },
      params?: RequestParams,
    ) => Promise<
      AxiosResponse<{
        id: number;
        src: string;
        thumbnail: string;
      }>
    >;
  };
}
