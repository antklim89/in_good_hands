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

export declare namespace Auth {
  /**
   * No description
   * @tags auth
   * @name ChangePassword
   * @request PATCH:/auth/change-password/
   * @response `201` `void` Default Response
   */
  namespace ChangePassword {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = {
      /**
       * @minLength 3
       * @maxLength 50
       */
      newPassword: string;
      /**
       * @minLength 3
       * @maxLength 50
       */
      oldPassword: string;
    };
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
     * No description
     * @tags auth
     * @name Login
     * @request POST:/auth/login/
     * @response `200` `{
        user: {
        email: string,
        name: string,
        id: string,
    
    },
        token: string,
    
    }` Default Response
    */
  namespace Login {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = {
      /**
       * @minLength 3
       * @maxLength 50
       */
      password: string;
      /**
       * @minLength 3
       * @maxLength 50
       */
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
     * @name Me
     * @request GET:/auth/me/
     * @response `200` `{
        id?: string,
      \**
       * @minLength 3
       * @maxLength 50
       *\
        email?: string,
      \**
       * @minLength 3
       * @maxLength 30
       *\
        name?: string,
      \**
       * @minLength 3
       * @maxLength 50
       *\
        tel?: string,
      \** @maxLength 50 *\
        whatsapp?: string,
      \** @maxLength 50 *\
        telegram?: string,
    
    }` Default Response
    */
  namespace Me {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id?: string;
      /**
       * @minLength 3
       * @maxLength 50
       */
      email?: string;
      /**
       * @minLength 3
       * @maxLength 30
       */
      name?: string;
      /**
       * @minLength 3
       * @maxLength 50
       */
      tel?: string;
      /** @maxLength 50 */
      whatsapp?: string;
      /** @maxLength 50 */
      telegram?: string;
    };
  }
  /**
     * No description
     * @tags auth
     * @name Register
     * @request POST:/auth/register/
     * @response `200` `{
        user: {
        email: string,
        name: string,
        id: string,
    
    },
        token: string,
    
    }` Default Response
    */
  namespace Register {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = {
      /**
       * @minLength 3
       * @maxLength 50
       */
      password: string;
      /**
       * @minLength 3
       * @maxLength 50
       */
      email: string;
      /**
       * @minLength 3
       * @maxLength 30
       */
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
      /**
       * @minLength 3
       * @maxLength 50
       */
      email?: string;
      /**
       * @minLength 3
       * @maxLength 30
       */
      name?: string;
      /**
       * @minLength 3
       * @maxLength 50
       */
      tel?: string;
      /** @maxLength 50 */
      whatsapp?: string;
      /** @maxLength 50 */
      telegram?: string;
    };
    type RequestHeaders = {};
    type ResponseBody = void;
  }
}
export declare namespace Ad {
  /**
     * No description
     * @tags ad
     * @name CreateNew
     * @request POST:/ad/create-new/
     * @response `201` `{
        id: number,
    
    }` Default Response
    */
  namespace CreateNew {
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
   * @name Delete
   * @request DELETE:/ad/delete/
   * @response `200` `void` Default Response
   */
  namespace Delete {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
     * No description
     * @tags ad
     * @name FindIds
     * @request GET:/ad/find-ids/
     * @response `200` `({
        id: number,
    
    })[]` Default Response
    */
  namespace FindIds {
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
     * @name FindMany
     * @request GET:/ad/find-many/
     * @response `200` `({
        id: number,
        createdAt: string,
        updatedAt: string,
        name: string,
        type: string,
        breed: string,
        price: number,
        birthday: string,
        images: ({
        id: number,
        src: string,
        thumbnail: string,
    
    })[],
        inFavorites?: boolean,
        owner: {
        id: string,
        name: string,
    
    },
    
    })[]` Default Response
    */
  namespace FindMany {
    type RequestParams = {};
    type RequestQuery = {
      cursor?: number;
      search?: string;
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
      inFavorites?: boolean;
      owner: {
        id: string;
        name: string;
      };
    }[];
  }
  /**
     * No description
     * @tags ad
     * @name FindMyAds
     * @request GET:/ad/find-my-ads/
     * @response `200` `({
        id: number,
        createdAt: string,
        name: string,
        type: string,
        breed: string,
        isPublished: boolean,
    
    })[]` Default Response
    */
  namespace FindMyAds {
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
     * @name FindOne
     * @request GET:/ad/find-one/
     * @response `200` `{
        id: number,
        createdAt: string,
        updatedAt: string,
        name: string,
        type: string,
        breed: string,
        price: number,
        birthday: string,
        description: string,
        tel: string,
        telegram?: string,
        whatsapp?: string,
        email: string,
        images: ({
        id: number,
        src: string,
        thumbnail: string,
    
    })[],
        inFavorites?: boolean,
        owner: {
        id: string,
        name: string,
    
    },
    
    }` Default Response
    */
  namespace FindOne {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
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
      description: string;
      tel: string;
      telegram?: string;
      whatsapp?: string;
      email: string;
      images: {
        id: number;
        src: string;
        thumbnail: string;
      }[];
      inFavorites?: boolean;
      owner: {
        id: string;
        name: string;
      };
    };
  }
  /**
     * No description
     * @tags ad
     * @name FindUpdateData
     * @request GET:/ad/find-update-data/
     * @response `200` `{
      \** @maxLength 100 *\
        name: string,
        type: "cat" | "dog" | "bird" | "aquarium" | "rodent",
      \**
       * @minLength 3
       * @maxLength 100
       *\
        breed: string,
      \**
       * @minLength 3
       * @maxLength 4000
       *\
        description: string,
      \**
       * @minLength 3
       * @maxLength 100
       *\
        email: string,
      \**
       * @minLength 3
       * @maxLength 100
       *\
        tel: string,
      \** @maxLength 50 *\
        whatsapp?: string,
      \** @maxLength 50 *\
        telegram?: string,
      \**
       * @min 0
       * @max 99999
       *\
        price: number,
      \** @format date *\
        birthday: string,
        isPublished: boolean,
        id: number,
        images: ({
        id: number,
        src: string,
        thumbnail: string,
    
    })[],
    
    }` Default Response
    */
  namespace FindUpdateData {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** @maxLength 100 */
      name: string;
      type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      /**
       * @minLength 3
       * @maxLength 100
       */
      breed: string;
      /**
       * @minLength 3
       * @maxLength 4000
       */
      description: string;
      /**
       * @minLength 3
       * @maxLength 100
       */
      email: string;
      /**
       * @minLength 3
       * @maxLength 100
       */
      tel: string;
      /** @maxLength 50 */
      whatsapp?: string;
      /** @maxLength 50 */
      telegram?: string;
      /**
       * @min 0
       * @max 99999
       */
      price: number;
      /** @format date */
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
      /** @maxLength 100 */
      name: string;
      type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
      /**
       * @minLength 3
       * @maxLength 100
       */
      breed: string;
      /**
       * @minLength 3
       * @maxLength 4000
       */
      description: string;
      /**
       * @minLength 3
       * @maxLength 100
       */
      email: string;
      /**
       * @minLength 3
       * @maxLength 100
       */
      tel: string;
      /** @maxLength 50 */
      whatsapp?: string;
      /** @maxLength 50 */
      telegram?: string;
      /**
       * @min 0
       * @max 99999
       */
      price: number;
      /** @format date */
      birthday: string;
      isPublished: boolean;
    };
    type RequestHeaders = {};
    type ResponseBody = void;
  }
}
export declare namespace Favorites {
  /**
   * No description
   * @tags favorites
   * @name Delete
   * @request DELETE:/favorites/delete/
   * @response `200` `void` Default Response
   */
  namespace Delete {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
   * No description
   * @tags favorites
   * @name Create
   * @request POST:/favorites/create/
   * @response `200` `number` Default Response
   */
  namespace Create {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = number;
  }
  /**
     * No description
     * @tags favorites
     * @name FindMany
     * @request GET:/favorites/find-many/
     * @response `200` `({
        id: number,
        ad: {
        id: number,
        name: string,
        type: string,
        breed: string,
        price: number,
    
    },
    
    })[]` Default Response
    */
  namespace FindMany {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      id: number;
      ad: {
        id: number;
        name: string;
        type: string;
        breed: string;
        price: number;
      };
    }[];
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
     * @response `201` `{
        id: number,
        src: string,
        thumbnail: string,
    
    }` Default Response
    */
  namespace Upload {
    type RequestParams = {};
    type RequestQuery = {
      adId: number;
    };
    type RequestBody = {
      /** @format binary */
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
export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}
type CancelToken = Symbol | string | number;
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
export declare class HttpClient<SecurityDataType = unknown> {
  baseUrl: string;
  private securityData;
  private securityWorker?;
  private abortControllers;
  private customFetch;
  private baseApiParams;
  constructor(apiConfig?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  protected encodeQueryParam(key: string, value: any): string;
  protected addQueryParam(query: QueryParamsType, key: string): string;
  protected addArrayQueryParam(query: QueryParamsType, key: string): any;
  protected toQueryString(rawQuery?: QueryParamsType): string;
  protected addQueryParams(rawQuery?: QueryParamsType): string;
  private contentFormatters;
  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams;
  protected createAbortSignal: (cancelToken: CancelToken) => AbortSignal | undefined;
  abortRequest: (cancelToken: CancelToken) => void;
  request: <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams) => Promise<HttpResponse<T, E>>;
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
  getRoot: (params?: RequestParams) => Promise<HttpResponse<void, any>>;
  auth: {
    /**
     * No description
     *
     * @tags auth
     * @name ChangePassword
     * @request PATCH:/auth/change-password/
     * @response `201` `void` Default Response
     */
    changePassword: (
      body: {
        /**
         * @minLength 3
         * @maxLength 50
         */
        newPassword: string;
        /**
         * @minLength 3
         * @maxLength 50
         */
        oldPassword: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
    /**
       * No description
       *
       * @tags auth
       * @name Login
       * @request POST:/auth/login/
       * @response `200` `{
          user: {
          email: string,
          name: string,
          id: string,
      
      },
          token: string,
      
      }` Default Response
       */
    login: (
      body: {
        /**
         * @minLength 3
         * @maxLength 50
         */
        password: string;
        /**
         * @minLength 3
         * @maxLength 50
         */
        email: string;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          user: {
            email: string;
            name: string;
            id: string;
          };
          token: string;
        },
        any
      >
    >;
    /**
       * No description
       *
       * @tags auth
       * @name Me
       * @request GET:/auth/me/
       * @response `200` `{
          id?: string,
        \**
         * @minLength 3
         * @maxLength 50
         *\
          email?: string,
        \**
         * @minLength 3
         * @maxLength 30
         *\
          name?: string,
        \**
         * @minLength 3
         * @maxLength 50
         *\
          tel?: string,
        \** @maxLength 50 *\
          whatsapp?: string,
        \** @maxLength 50 *\
          telegram?: string,
      
      }` Default Response
       */
    me: (params?: RequestParams) => Promise<
      HttpResponse<
        {
          id?: string;
          /**
           * @minLength 3
           * @maxLength 50
           */
          email?: string;
          /**
           * @minLength 3
           * @maxLength 30
           */
          name?: string;
          /**
           * @minLength 3
           * @maxLength 50
           */
          tel?: string;
          /** @maxLength 50 */
          whatsapp?: string;
          /** @maxLength 50 */
          telegram?: string;
        },
        any
      >
    >;
    /**
       * No description
       *
       * @tags auth
       * @name Register
       * @request POST:/auth/register/
       * @response `200` `{
          user: {
          email: string,
          name: string,
          id: string,
      
      },
          token: string,
      
      }` Default Response
       */
    register: (
      body: {
        /**
         * @minLength 3
         * @maxLength 50
         */
        password: string;
        /**
         * @minLength 3
         * @maxLength 50
         */
        email: string;
        /**
         * @minLength 3
         * @maxLength 30
         */
        name: string;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          user: {
            email: string;
            name: string;
            id: string;
          };
          token: string;
        },
        any
      >
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
        /**
         * @minLength 3
         * @maxLength 50
         */
        email?: string;
        /**
         * @minLength 3
         * @maxLength 30
         */
        name?: string;
        /**
         * @minLength 3
         * @maxLength 50
         */
        tel?: string;
        /** @maxLength 50 */
        whatsapp?: string;
        /** @maxLength 50 */
        telegram?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
  };
  ad: {
    /**
       * No description
       *
       * @tags ad
       * @name CreateNew
       * @request POST:/ad/create-new/
       * @response `201` `{
          id: number,
      
      }` Default Response
       */
    createNew: (params?: RequestParams) => Promise<
      HttpResponse<
        {
          id: number;
        },
        any
      >
    >;
    /**
     * No description
     *
     * @tags ad
     * @name Delete
     * @request DELETE:/ad/delete/
     * @response `200` `void` Default Response
     */
    delete: (
      query: {
        adId: number;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
    /**
       * No description
       *
       * @tags ad
       * @name FindIds
       * @request GET:/ad/find-ids/
       * @response `200` `({
          id: number,
      
      })[]` Default Response
       */
    findIds: (params?: RequestParams) => Promise<
      HttpResponse<
        {
          id: number;
        }[],
        any
      >
    >;
    /**
       * No description
       *
       * @tags ad
       * @name FindMany
       * @request GET:/ad/find-many/
       * @response `200` `({
          id: number,
          createdAt: string,
          updatedAt: string,
          name: string,
          type: string,
          breed: string,
          price: number,
          birthday: string,
          images: ({
          id: number,
          src: string,
          thumbnail: string,
      
      })[],
          inFavorites?: boolean,
          owner: {
          id: string,
          name: string,
      
      },
      
      })[]` Default Response
       */
    findMany: (
      query?: {
        cursor?: number;
        search?: string;
        searchType?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        ltePrice?: number;
        gtePrice?: number;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
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
          inFavorites?: boolean;
          owner: {
            id: string;
            name: string;
          };
        }[],
        any
      >
    >;
    /**
       * No description
       *
       * @tags ad
       * @name FindMyAds
       * @request GET:/ad/find-my-ads/
       * @response `200` `({
          id: number,
          createdAt: string,
          name: string,
          type: string,
          breed: string,
          isPublished: boolean,
      
      })[]` Default Response
       */
    findMyAds: (
      query?: {
        cursor?: number;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          id: number;
          createdAt: string;
          name: string;
          type: string;
          breed: string;
          isPublished: boolean;
        }[],
        any
      >
    >;
    /**
       * No description
       *
       * @tags ad
       * @name FindOne
       * @request GET:/ad/find-one/
       * @response `200` `{
          id: number,
          createdAt: string,
          updatedAt: string,
          name: string,
          type: string,
          breed: string,
          price: number,
          birthday: string,
          description: string,
          tel: string,
          telegram?: string,
          whatsapp?: string,
          email: string,
          images: ({
          id: number,
          src: string,
          thumbnail: string,
      
      })[],
          inFavorites?: boolean,
          owner: {
          id: string,
          name: string,
      
      },
      
      }` Default Response
       */
    findOne: (
      query: {
        adId: number;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          id: number;
          createdAt: string;
          updatedAt: string;
          name: string;
          type: string;
          breed: string;
          price: number;
          birthday: string;
          description: string;
          tel: string;
          telegram?: string;
          whatsapp?: string;
          email: string;
          images: {
            id: number;
            src: string;
            thumbnail: string;
          }[];
          inFavorites?: boolean;
          owner: {
            id: string;
            name: string;
          };
        },
        any
      >
    >;
    /**
       * No description
       *
       * @tags ad
       * @name FindUpdateData
       * @request GET:/ad/find-update-data/
       * @response `200` `{
        \** @maxLength 100 *\
          name: string,
          type: "cat" | "dog" | "bird" | "aquarium" | "rodent",
        \**
         * @minLength 3
         * @maxLength 100
         *\
          breed: string,
        \**
         * @minLength 3
         * @maxLength 4000
         *\
          description: string,
        \**
         * @minLength 3
         * @maxLength 100
         *\
          email: string,
        \**
         * @minLength 3
         * @maxLength 100
         *\
          tel: string,
        \** @maxLength 50 *\
          whatsapp?: string,
        \** @maxLength 50 *\
          telegram?: string,
        \**
         * @min 0
         * @max 99999
         *\
          price: number,
        \** @format date *\
          birthday: string,
          isPublished: boolean,
          id: number,
          images: ({
          id: number,
          src: string,
          thumbnail: string,
      
      })[],
      
      }` Default Response
       */
    findUpdateData: (
      query: {
        adId: number;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          /** @maxLength 100 */
          name: string;
          type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
          /**
           * @minLength 3
           * @maxLength 100
           */
          breed: string;
          /**
           * @minLength 3
           * @maxLength 4000
           */
          description: string;
          /**
           * @minLength 3
           * @maxLength 100
           */
          email: string;
          /**
           * @minLength 3
           * @maxLength 100
           */
          tel: string;
          /** @maxLength 50 */
          whatsapp?: string;
          /** @maxLength 50 */
          telegram?: string;
          /**
           * @min 0
           * @max 99999
           */
          price: number;
          /** @format date */
          birthday: string;
          isPublished: boolean;
          id: number;
          images: {
            id: number;
            src: string;
            thumbnail: string;
          }[];
        },
        any
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
        /** @maxLength 100 */
        name: string;
        type: "cat" | "dog" | "bird" | "aquarium" | "rodent";
        /**
         * @minLength 3
         * @maxLength 100
         */
        breed: string;
        /**
         * @minLength 3
         * @maxLength 4000
         */
        description: string;
        /**
         * @minLength 3
         * @maxLength 100
         */
        email: string;
        /**
         * @minLength 3
         * @maxLength 100
         */
        tel: string;
        /** @maxLength 50 */
        whatsapp?: string;
        /** @maxLength 50 */
        telegram?: string;
        /**
         * @min 0
         * @max 99999
         */
        price: number;
        /** @format date */
        birthday: string;
        isPublished: boolean;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
  };
  favorites: {
    /**
     * No description
     *
     * @tags favorites
     * @name Delete
     * @request DELETE:/favorites/delete/
     * @response `200` `void` Default Response
     */
    delete: (
      query: {
        adId: number;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<void, any>>;
    /**
     * No description
     *
     * @tags favorites
     * @name Create
     * @request POST:/favorites/create/
     * @response `200` `number` Default Response
     */
    create: (
      query: {
        adId: number;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<number, any>>;
    /**
       * No description
       *
       * @tags favorites
       * @name FindMany
       * @request GET:/favorites/find-many/
       * @response `200` `({
          id: number,
          ad: {
          id: number,
          name: string,
          type: string,
          breed: string,
          price: number,
      
      },
      
      })[]` Default Response
       */
    findMany: (params?: RequestParams) => Promise<
      HttpResponse<
        {
          id: number;
          ad: {
            id: number;
            name: string;
            type: string;
            breed: string;
            price: number;
          };
        }[],
        any
      >
    >;
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
    ) => Promise<HttpResponse<void, any>>;
    /**
       * No description
       *
       * @tags image
       * @name Upload
       * @request POST:/image/upload/
       * @response `201` `{
          id: number,
          src: string,
          thumbnail: string,
      
      }` Default Response
       */
    upload: (
      query: {
        adId: number;
      },
      data: {
        /** @format binary */
        image: File;
      },
      params?: RequestParams,
    ) => Promise<
      HttpResponse<
        {
          id: number;
          src: string;
          thumbnail: string;
        },
        any
      >
    >;
  };
}
export {};
