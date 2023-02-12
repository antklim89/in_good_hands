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

export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  baseUrl = "http://localhost:8000";
  securityData = null;
  securityWorker;
  abortControllers = new Map();
  customFetch = (...fetchParams) => fetch(...fetchParams);
  baseApiParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  constructor(apiConfig = {}) {
    Object.assign(this, apiConfig);
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  encodeQueryParam(key, value) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }
  addQueryParam(query, key) {
    return this.encodeQueryParam(key, query[key]);
  }
  addArrayQueryParam(query, key) {
    const value = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join("&");
  }
  toQueryString(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  contentFormatters = {
    [ContentType.Json]: (input) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input) =>
      Object.keys(input || {}).reduce((formData, key) => {
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
      }, new FormData()),
    [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
  };
  mergeRequestParams(params1, params2) {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  createAbortSignal = (cancelToken) => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }
    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };
  abortRequest = (cancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };
  request = async ({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;
    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response;
      r.data = null;
      r.error = null;
      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });
      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }
      if (!response.ok) throw data;
      return data;
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
export class Api extends HttpClient {
  /**
   * No description
   *
   * @name GetRoot
   * @request GET:/
   * @response `200` `void` Default Response
   */
  getRoot = (params = {}) =>
    this.request({
      path: `/`,
      method: "GET",
      ...params,
    });
  ad = {
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
    createNew: (params = {}) =>
      this.request({
        path: `/ad/create-new/`,
        method: "POST",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags ad
     * @name Delete
     * @request DELETE:/ad/delete/
     * @response `200` `void` Default Response
     */
    delete: (query, params = {}) =>
      this.request({
        path: `/ad/delete/`,
        method: "DELETE",
        query: query,
        ...params,
      }),
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
    findIds: (params = {}) =>
      this.request({
        path: `/ad/find-ids/`,
        method: "GET",
        format: "json",
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

})[]` Default Response
 */
    findMany: (query, params = {}) =>
      this.request({
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
    findMyAds: (query, params = {}) =>
      this.request({
        path: `/ad/find-my-ads/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
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

}` Default Response
 */
    findOne: (query, params = {}) =>
      this.request({
        path: `/ad/find-one/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
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
    findUpdateData: (query, params = {}) =>
      this.request({
        path: `/ad/find-update-data/`,
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
    update: (query, body, params = {}) =>
      this.request({
        path: `/ad/update/`,
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
     * @request PATCH:/auth/change-password/
     * @response `201` `void` Default Response
     */
    changePassword: (body, params = {}) =>
      this.request({
        path: `/auth/change-password/`,
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
    login: (body, params = {}) =>
      this.request({
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
    me: (params = {}) =>
      this.request({
        path: `/auth/me/`,
        method: "GET",
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
    update: (body, params = {}) =>
      this.request({
        path: `/auth/update/`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
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
    register: (body, params = {}) =>
      this.request({
        path: `/auth/register/`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  favorites = {
    /**
     * No description
     *
     * @tags favorites
     * @name Create
     * @request POST:/favorites/create/
     * @response `200` `number` Default Response
     */
    create: (query, params = {}) =>
      this.request({
        path: `/favorites/create/`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags favorites
     * @name Delete
     * @request DELETE:/favorites/delete/
     * @response `200` `void` Default Response
     */
    delete: (query, params = {}) =>
      this.request({
        path: `/favorites/delete/`,
        method: "DELETE",
        query: query,
        ...params,
      }),
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
    findMany: (params = {}) =>
      this.request({
        path: `/favorites/find-many/`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  image = {
    /**
     * No description
     *
     * @tags image
     * @name Delete
     * @request DELETE:/image/delete/
     * @response `201` `void` Default Response
     */
    delete: (query, params = {}) =>
      this.request({
        path: `/image/delete/`,
        method: "DELETE",
        query: query,
        ...params,
      }),
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
    upload: (query, data, params = {}) =>
      this.request({
        path: `/image/upload/`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
