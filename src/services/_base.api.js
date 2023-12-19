import axios from "@utils/axio.instance";
import { objectHelper } from "@utils/object.helper";

export default class BaseServices {
  /*
   * GET: {dynamic}/getbyno/:pageno&:pagesize&:query
   */
  static getByPageNo = (url, params) => {
    params = params || {};

    if (
      !params.hasOwnProperty("pageno") ||
      !params.hasOwnProperty("pagesize")
    ) {
      params = {
        pageno: 1,
        pagesize: 1000,
        ...params,
      };
    }

    if (!params.hasOwnProperty("query")) {
      params.query = {};
    }

    return new Promise((resolve, reject) => {
      axios
        .get(objectHelper.parseToQueryString(url, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  /*
   * GET: {dynamic}/getbyfilter/:query
   */
  static getbyfilter = (url, params) => {
    params = params || {};
    if (!params.hasOwnProperty("query")) {
      params.query = {};
    }

    return new Promise((resolve, reject) => {
      axios
        .get(objectHelper.parseToQueryString(url, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  /*
   * GET: {dynamic}/getbyid/:id
   */
  static getbyid = (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(objectHelper.parseToQueryString(url, params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  /*
   * POST: {dynamic}/insertnew
   */
  static insertnew = (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  /*
   * PUT: {dynamic}/update
   */
  static update = (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  /*
   * DELETE: {dynamic}/delete
   */
  static delete = (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(url + params.ids.join(","))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };
}
