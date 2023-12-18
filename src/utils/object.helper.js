import { crossCutting } from "./crossCutting";

export class objectHelper {
  // keys: as a string example to use: getValueObjects(object, "a.b.c.d")
  static getValue = (object, keys) =>
    keys.split(".").reduce((o, k) => (o || {})[k], object);

  static parseToQueryString = (url, params) =>
    url +
    Object.keys(params)
      .map((key) => params[key])
      .join("&");

  static createQueryString = (url, queryObject) => {
    let queryString = Object.keys(queryObject)
      .filter(
        (key) =>
          queryObject[key] &&
          !(Array.isArray(queryObject[key]) && !queryObject[key].length)
      )
      .map((key) => {
        return Array.isArray(queryObject[key])
          ? queryObject[key]
              .map(
                (item) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
              )
              .join("&")
          : `${encodeURIComponent(key)}=${encodeURIComponent(
              queryObject[key]
            )}`;
      })
      .join("&");
    console.log(
      "sdfsdfsdfsdfsdf",
      url + (queryString ? `?${queryString}` : "")
    );
    console.log("queryStringqueryStringqueryString", queryString);
    return url + (queryString ? `${queryString}` : "");
  };

  static getDiff = (newObj, oldObj) => {
    let diff = Object.keys(newObj).reduce((diff, key) => {
      if (newObj[key] === oldObj[key]) return diff;
      return {
        ...diff,
        [key]: newObj[key],
      };
    }, {});
    return diff;
    //! use lodash here?
    // return _.reduce(
    //   newObj,
    //   function (result, value, key) {
    //     if (!_.isEqual(value, oldObj[key])) {
    //       if (_.isArray(value)) {
    //         result[key] = [];
    //         _.forEach(value, function (innerObjFrom1, index) {
    //           if (_.isNil(oldObj[key][index])) {
    //             result[key].push(innerObjFrom1);
    //           } else {
    //             let changes = crossCutting.diffObjects(
    //               innerObjFrom1,
    //               oldObj[key][index]
    //             );
    //             if (!_.isEmpty(changes)) {
    //               result[key].push(changes);
    //             }
    //           }
    //         });
    //       }
    //       // else if (_.isObject(value)) {
    //       //   result[key] = crossCutting.diffObjects(value, oldObj[key]);
    //       // }
    //       else {
    //         result[key] = value;
    //       }
    //     }
    //     return result;
    //   },
    //   {}
    // );
  };

  static diffArrayObjects = (current, otherArray, filterKey = "_id") => {
    return current.filter(
      ({ [filterKey]: currentKey }) =>
        !otherArray.some(({ [filterKey]: otherKey }) => currentKey === otherKey)
    );
  };

  static isEmpty = (obj) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  };

  // Check if the input is a json object (whether startsWidth '{' and endsWidth '}') or not
  static isJsonObject = (text) => {
    let str = String(text).trim();

    if (!str.startsWith("{") || !str.endsWith("}")) return false;

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  };

  // Check if the input is a json array (whether startsWidth '[' and endsWidth ']') or not
  static isJsonArray = (text) => {
    let str = String(text).trim();
    return str.startsWith("[") && str.endsWith("]");
  };

  static compareArrays = (a, b) =>
    a.length === b.length &&
    a.every(
      (element, index) =>
        element === b[index] ||
        JSON.stringify(element) === JSON.stringify(b[index])
    );
}
