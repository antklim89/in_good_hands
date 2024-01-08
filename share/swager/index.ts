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
 * @name CreateNew
 * @request POST:/ad/create-new
 * @response `201` `{
    id: number,

}` Default Response
*/
  export namespace CreateNew {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      id: number;
    };
  }
  /**
   * No description
   * @tags ad
   * @name Delete
   * @request DELETE:/ad/delete
   * @response `200` `void` Default Response
   */
  export namespace Delete {
    export type RequestParams = {};
    export type RequestQuery = {
      adId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
 * No description
 * @tags ad
 * @name FindIds
 * @request GET:/ad/find-ids
 * @response `200` `({
    id: number,

})[]` Default Response
*/
  export namespace FindIds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
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
  export namespace FindMany {
    export type RequestParams = {};
    export type RequestQuery = {
      cursor?: number;
      search?: string;
      searchType?: "cat" | "dog" | "bird" | "aquarium" | "rodent";
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
 * @request GET:/ad/find-my-ads
 * @response `200` `({
    id: number,
    createdAt: string,
    name: string,
    type: string,
    breed: string,
    isPublished: boolean,

})[]` Default Response
*/
  export namespace FindMyAds {
    export type RequestParams = {};
    export type RequestQuery = {
      cursor?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
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
 * @request GET:/ad/find-one
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
  export namespace FindOne {
    export type RequestParams = {};
    export type RequestQuery = {
      adId: number;
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
 * @request GET:/ad/find-update-data
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
  export namespace FindUpdateData {
    export type RequestParams = {};
    export type RequestQuery = {
      adId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
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
   * @request PATCH:/ad/update
   * @response `200` `void` Default Response
   */
  export namespace Update {
    export type RequestParams = {};
    export type RequestQuery = {
      id: number;
    };
    export type RequestBody = {
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
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Auth {
  /**
   * No description
   * @tags auth
   * @name ChangePassword
   * @request PATCH:/auth/change-password
   * @response `201` `void` Default Response
   */
  export namespace ChangePassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
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
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
 * No description
 * @tags auth
 * @name Login
 * @request POST:/auth/login
 * @response `200` `{
    user: {
    email: string,
    name: string,
    id: string,

},
    token: string,

}` Default Response
*/
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
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
    export type RequestHeaders = {};
    export type ResponseBody = {
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
 * @request GET:/auth/me
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
  export namespace Me {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
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
 * @request POST:/auth/register
 * @response `200` `{
    user: {
    email: string,
    name: string,
    id: string,

},
    token: string,

}` Default Response
*/
  export namespace Register {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
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
    export type RequestHeaders = {};
    export type ResponseBody = {
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
   * @request PATCH:/auth/update
   * @response `200` `void` Default Response
   */
  export namespace Update {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
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
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Favorites {
  /**
   * No description
   * @tags favorites
   * @name Create
   * @request POST:/favorites/create
   * @response `200` `number` Default Response
   */
  export namespace Create {
    export type RequestParams = {};
    export type RequestQuery = {
      adId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }
  /**
   * No description
   * @tags favorites
   * @name Delete
   * @request DELETE:/favorites/delete
   * @response `200` `void` Default Response
   */
  export namespace Delete {
    export type RequestParams = {};
    export type RequestQuery = {
      adId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
 * No description
 * @tags favorites
 * @name FindMany
 * @request GET:/favorites/find-many
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
  export namespace FindMany {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
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

export namespace Image {
  /**
 * No description
 * @tags image
 * @name Upload
 * @request POST:/image/upload
 * @response `201` `{
    id: number,
    src: string,
    thumbnail: string,

}` Default Response
*/
  export namespace Upload {
    export type RequestParams = {};
    export type RequestQuery = {
      adId: number;
    };
    export type RequestBody = {
      /** @format binary */
      image: File;
    };
    export type RequestHeaders = {};
    export type ResponseBody = {
      id: number;
      src: string;
      thumbnail: string;
    };
  }
  /**
   * No description
   * @tags image
   * @name Delete
   * @request DELETE:/image/delete
   * @response `201` `void` Default Response
   */
  export namespace Delete {
    export type RequestParams = {};
    export type RequestQuery = {
      imageId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

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
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

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
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title @fastify/swagger
 * @version 8.13.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name Get
   * @request GET://
   * @response `200` `void` Default Response
   */
  get = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `//`,
      method: "GET",
      ...params,
    });

  ad = {
    /**
 * No description
 *
 * @tags ad
 * @name CreateNew
 * @request POST:/ad/create-new
 * @response `201` `{
    id: number,

}` Default Response
 */
    createNew: (params: RequestParams = {}) =>
      this.request<
        {
          id: number;
        },
        any
      >({
        path: `/ad/create-new`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name Delete
     * @request DELETE:/ad/delete
     * @response `200` `void` Default Response
     */
    delete: (
      query: {
        adId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ad/delete`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
 * No description
 *
 * @tags ad
 * @name FindIds
 * @request GET:/ad/find-ids
 * @response `200` `({
    id: number,

})[]` Default Response
 */
    findIds: (params: RequestParams = {}) =>
      this.request<
        {
          id: number;
        }[],
        any
      >({
        path: `/ad/find-ids`,
        method: "GET",
        ...params,
      }),

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
      >({
        path: `/ad/find-many/`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
 * No description
 *
 * @tags ad
 * @name FindMyAds
 * @request GET:/ad/find-my-ads
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
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          createdAt: string;
          name: string;
          type: string;
          breed: string;
          isPublished: boolean;
        }[],
        any
      >({
        path: `/ad/find-my-ads`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
 * No description
 *
 * @tags ad
 * @name FindOne
 * @request GET:/ad/find-one
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
      >({
        path: `/ad/find-one`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
 * No description
 *
 * @tags ad
 * @name FindUpdateData
 * @request GET:/ad/find-update-data
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
      params: RequestParams = {},
    ) =>
      this.request<
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
      >({
        path: `/ad/find-update-data`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ad
     * @name Update
     * @request PATCH:/ad/update
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
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/ad/update`,
        method: "PATCH",
        query: query,
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name ChangePassword
     * @request PATCH:/auth/change-password
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
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/change-password`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
 * No description
 *
 * @tags auth
 * @name Login
 * @request POST:/auth/login
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
      params: RequestParams = {},
    ) =>
      this.request<
        {
          user: {
            email: string;
            name: string;
            id: string;
          };
          token: string;
        },
        any
      >({
        path: `/auth/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
 * No description
 *
 * @tags auth
 * @name Me
 * @request GET:/auth/me
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
    me: (params: RequestParams = {}) =>
      this.request<
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
      >({
        path: `/auth/me`,
        method: "GET",
        ...params,
      }),

    /**
 * No description
 *
 * @tags auth
 * @name Register
 * @request POST:/auth/register
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
      params: RequestParams = {},
    ) =>
      this.request<
        {
          user: {
            email: string;
            name: string;
            id: string;
          };
          token: string;
        },
        any
      >({
        path: `/auth/register`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name Update
     * @request PATCH:/auth/update
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
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/update`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
  favorites = {
    /**
     * No description
     *
     * @tags favorites
     * @name Create
     * @request POST:/favorites/create
     * @response `200` `number` Default Response
     */
    create: (
      query: {
        adId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, any>({
        path: `/favorites/create`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags favorites
     * @name Delete
     * @request DELETE:/favorites/delete
     * @response `200` `void` Default Response
     */
    delete: (
      query: {
        adId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/favorites/delete`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
 * No description
 *
 * @tags favorites
 * @name FindMany
 * @request GET:/favorites/find-many
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
    findMany: (params: RequestParams = {}) =>
      this.request<
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
      >({
        path: `/favorites/find-many`,
        method: "GET",
        ...params,
      }),
  };
  image = {
    /**
 * No description
 *
 * @tags image
 * @name Upload
 * @request POST:/image/upload
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
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          src: string;
          thumbnail: string;
        },
        any
      >({
        path: `/image/upload`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags image
     * @name Delete
     * @request DELETE:/image/delete
     * @response `201` `void` Default Response
     */
    delete: (
      query: {
        imageId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/image/delete`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
}
