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

import axios from "axios";
export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
  instance;
  securityData = null;
  securityWorker;
  secure;
  format;
  constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  mergeRequestParams(params1, params2) {
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
  createFormData(input) {
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
  request = async ({ secure, path, type, query, format, body, ...params }) => {
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
      body = this.createFormData(body);
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
     * @name New
     * @request POST:/ad/new/
     * @response `201` `{ id: number }` Default Response
     */
    new: (params = {}) =>
      this.request({
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
     * @response `200` `({ id: number, createdAt: string, updatedAt: string, name: string, type: string, breed: string, price: number, images: ({ id: number, src: string, thumbnail: string })[] })[]` Default Response
     */
    previewList: (query, params = {}) =>
      this.request({
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
    update: (query, body, params = {}) =>
      this.request({
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
     * @response `200` `{ name: string, type: "cat" | "dog" | "bird" | "aquarium" | "rodent", breed: string, description: string, email: string, tel: string, price: number, isPublished: boolean, id: number, images: ({ id: number, src: string, thumbnail: string })[] }` Default Response
     */
    updateData: (query, params = {}) =>
      this.request({
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
     * @name Register
     * @request POST:/auth/register/
     * @response `200` `{ user: { email: string, name: string, id: string }, token: string }` Default Response
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
     * @response `201` `{ id: number, src: string, thumbnail: string }` Default Response
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
