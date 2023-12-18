import encrypt from "@utils/encrypt.helper";
// import * as _ from "lodash";

export class crossCutting {
  static Spinner() {
    return (
      <React.Fragment>
        {/* <div className="pos-center">
          <CircularProgress disableShrink />
        </div> */}
      </React.Fragment>
    );
  }

  //#region generate
  static generateKey = (pre) => {
    return `${this.isNotNull(pre) ? pre + "_" : ""}${
      new Date().getTime() + this.randomNumber()
    }`;
  };

  // Generate a cryptographically secure random password.
  static generatePassword = (length = 8) => {
    let password = "";
    const chars = [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "abcdefghijklmnopqrstuvwxyz",
      "@$!%*?&",
      "1234567890",
    ];
    for (let j = 0; j < chars.length; j++) {
      password += chars[j].charAt(Math.floor(Math.random() * chars[j].length));
    }
    if (length > chars.length) {
      length = length - chars.length;
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        password += chars[index].charAt(
          Math.floor(Math.random() * chars[index].length)
        );
      }
    }
    return password
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
  };

  static uuidv4 = () => {
    var dt = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  };

  static randomNumber = (min = 1, max = 100) => {
    return min + Math.random() * (max - min);
  };

  static generateColor = (color = "") => {
    switch (color) {
      //* Generate light color
      case "light":
        var letters = "BCDEF".split("");
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;

      //* Generate dark color
      case "dark":
        var lum = -0.25;
        var hex = String(
          "#" + Math.random().toString(16).slice(2, 8).toUpperCase()
        ).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        var rgb = "#",
          c,
          i;
        for (i = 0; i < 3; i++) {
          c = parseInt(hex.substr(i * 2, 2), 16);
          c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
          rgb += ("00" + c).substr(c.length);
        }
        return rgb;

      default:
        return (
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
        );
    }
  };
  //#endregion

  //#region check/detect
  static isNotNull(data) {
    return (
      data !== null && data !== undefined && !objectExtension.isEmpty(data)
    );
  }

  static isNull(data) {
    return !this.isNotNull(data);
  }

  static detectEnvironment() {
    {
      var unknown = "-";

      // screen
      var screenSize = "";
      if (screen.width) {
        var width = screen.width ? screen.width : 0;
        var height = screen.height ? screen.height : 0;
        screenSize += "" + width + " x " + height;
      }

      // windowsize
      var windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      //browser
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browser = navigator.appName;
      var version = "" + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var nameOffset, verOffset, ix;

      // Opera
      if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browser = "Opera";
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // MSIE
      else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browser = "Microsoft Internet Explorer";
        version = nAgt.substring(verOffset + 5);
      }
      // Chrome
      else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browser = "Chrome";
        version = nAgt.substring(verOffset + 7);
      }
      // Safari
      else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browser = "Safari";
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Firefox
      else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browser = "Firefox";
        version = nAgt.substring(verOffset + 8);
      }
      // MSIE 11+
      else if (nAgt.indexOf("Trident/") != -1) {
        browser = "Microsoft Internet Explorer";
        version = nAgt.substring(nAgt.indexOf("rv:") + 3);
      }
      // Other browsers
      else if (
        (nameOffset = nAgt.lastIndexOf(" ") + 1) <
        (verOffset = nAgt.lastIndexOf("/"))
      ) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
          browser = navigator.appName;
        }
      }
      // trim the version string
      if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

      majorVersion = parseInt("" + version, 10);
      if (isNaN(majorVersion)) {
        version = "" + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }

      // mobile version
      var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

      // cookie
      var cookieEnabled = navigator.cookieEnabled ? true : false;

      if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled =
          document.cookie.indexOf("testcookie") != -1 ? true : false;
      }

      // system
      var os = unknown;
      var clientStrings = [
        { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
        { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
        { s: "Windows Vista", r: /Windows NT 6.0/ },
        { s: "Windows Server 2003", r: /Windows NT 5.2/ },
        { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
        { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
        { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
        { s: "Windows 98", r: /(Windows 98|Win98)/ },
        { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
        {
          s: "Windows NT 4.0",
          r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
        },
        { s: "Windows CE", r: /Windows CE/ },
        { s: "Windows 3.11", r: /Win16/ },
        { s: "Android", r: /Android/ },
        { s: "Open BSD", r: /OpenBSD/ },
        { s: "Sun OS", r: /SunOS/ },
        { s: "Linux", r: /(Linux|X11)/ },
        { s: "iOS", r: /(iPhone|iPad|iPod)/ },
        { s: "Mac OS X", r: /Mac OS X/ },
        { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: "QNX", r: /QNX/ },
        { s: "UNIX", r: /UNIX/ },
        { s: "BeOS", r: /BeOS/ },
        { s: "OS/2", r: /OS\/2/ },
        {
          s: "Search Bot",
          r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
        },
      ];
      for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
        }
      }

      var osVersion = unknown;

      if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = "Windows";
      }

      switch (os) {
        case "Mac OS X":
          osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
          break;

        case "Android":
          osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
          break;

        case "iOS":
          osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
          osVersion =
            osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
          break;
      }

      var flashVersion = "no check",
        d,
        fv = [];
      if (
        typeof navigator.plugins !== "undefined" &&
        typeof navigator.plugins["Shockwave Flash"] === "object"
      ) {
        d = navigator.plugins["Shockwave Flash"].description;
        if (
          d &&
          !(
            typeof navigator.mimeTypes !== "undefined" &&
            navigator.mimeTypes["application/x-shockwave-flash"] &&
            !navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
          )
        ) {
          // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
          d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          fv[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
          fv[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
          fv[2] = /[a-zA-Z]/.test(d)
            ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10)
            : 0;
        }
      } else if (typeof window.ActiveXObject !== "undefined") {
        try {
          var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          if (a) {
            // a will return null when ActiveX is disabled
            d = a.GetVariable("$version");
            if (d) {
              d = d.split(" ")[1].split(",");
              fv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
            }
          }
        } catch (e) {}
      }
      if (fv.length) {
        flashVersion = fv[0] + "." + fv[1] + " r" + fv[2];
      }
    }

    window.jscd = {
      screen: screenSize,
      responsive: windowSize.width < 768,
      browser: browser,
      browserVersion: version,
      mobile: mobile,
      os: os,
      osVersion: osVersion,
      cookies: cookieEnabled,
      flashVersion: flashVersion,
    };

    //#region add class & isDevice for browser
    function setAttributes(el, attrs) {
      Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
    }
    const tagHtml = document.getElementsByTagName("html")[0];
    setAttributes(tagHtml, {
      browser: jscd.browser.toLowerCase() + " " + jscd.browserVersion,
      os: jscd.os.toLowerCase() + " " + jscd.osVersion,
      ismobile: jscd.mobile,
      responsive: jscd.responsive,
      screen: jscd.screen,
    });

    //* listener window resize
    // $(window)
    //   .off("resize.setAttributesHtml")
    //   .on("resize.setAttributesHtml", function () {
    //     crossCutting.detectEnvironment();
    //   });
    //#endregion

    return jscd;
  }
  //#endregion

  //#region simulator
  static simulateNetworkRequest(timer = 2000) {
    return new Promise((resolve) => setTimeout(resolve, timer));
  }

  static debounce(func, wait = 400) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  //#endregion

  //#region validation
  static validatePassword(value) {
    if (value.length < 6) {
      return "Password should be at-least 6 characters.";
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
    ) {
      return "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.";
    }
    return true;
  }
  //#endregion
}

//#region objects
export class objectExtension {
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
//#endregion

//#region array
export class arrayExtension {
  static insert = (arr, index, ...items) => {
    return [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted items
      ...items,
      // part of the array after the specified index
      ...arr.slice(index),
    ];
  };

  static update = (arr, newItem, field = "_id") => {
    var itemField = Array.isArray(newItem) ? newItem[0] : newItem;

    if (Array.isArray(arr)) {
      return arr.map((item) => {
        if (item[field] === itemField[field]) {
          return {
            ...item,
            ...itemField,
          };
        }

        return item;
      });
    }

    return itemField;
  };

  static delete = (arr, objItems, field = "_id") => {
    return objItems.length
      ? objectExtension.diffArrayObjects(arr, objItems) // deleteMany
      : arr.filter((item) => {
          // deleteOne
          return item[field] !== objItems[field];
        });
  };

  //* shuffle array
  static shuffle = (array) => {
    let ctr = array.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
  };

  //* build buildHierarchies
  static buildHierarchies = (
    array = [],
    idField = "_id",
    parentField = "parent"
  ) => {
    var sortDirectories = function (directories, parent) {
      let node = [];
      directories
        .filter(function (d) {
          return d[parentField] === parent;
        })
        .forEach(function (d) {
          var cd = d;
          cd.children = sortDirectories(directories, d[idField]);
          return node.push(cd);
        });
      return node;
    };

    return sortDirectories([...array], "");
  };
}
//#endregion

//#region string
export class stringExtension {
  static render = (value, langCode = "", defaultValue = "Noname") => {
    return crossCutting.isNotNull(value)
      ? langCode !== ""
        ? crossCutting.isNotNull(value[langCode])
          ? value[langCode]
          : defaultValue
        : value
      : defaultValue;
  };

  static stripedHtml = (text) => {
    text = text.replace(/[<|>]/gi, "");

    if (
      text.toLowerCase().indexOf("javascript") > -1 ||
      text.toLowerCase().indexOf("&lt;") > -1 ||
      text.toLowerCase().indexOf("&gt;") > -1
    ) {
      text = text.replace(/[javascript|&lt;|&gt;]/gi, "");
    }

    return text;
  };

  static mungeEmailAddress = (text) => {
    var i = text.indexOf("@");
    var startIndex = (i * 0.2) | 0;
    var endIndex = (i * 0.9) | 0;
    return (
      text.slice(0, startIndex) +
      text.slice(startIndex, endIndex).replace(/./g, "*") +
      text.slice(endIndex)
    );
  };

  static parseValueToBool = (value) => {
    return value === true || value === "true" || value === "True";
  };

  //#region convert currency
  static numberWithSympol(value, dot = ",", decimal_point = 0) {
    let valueCheck = isNaN(value) ? 0 : parseFloat(value);

    return valueCheck
      .toFixed(decimal_point)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + dot);
  }

  static compactNumber(value) {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + value).length / 3);

    let shortValue = parseFloat(
      (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2
      )
    );

    if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
    }

    return shortValue + suffixes[suffixNum];
  }

  static formatBytes(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
  }
  //#endregion

  //* RANK
  static ordinalSuffix(value) {
    let j = number % 10;
    let k = number % 100;
    if (j == 1 && k != 11) {
      return `${value}st`;
    }

    if (j == 2 && k != 12) {
      return `${value}nd`;
    }

    if (j == 3 && k != 13) {
      return `${value}rd`;
    }

    return `${value}th`;
  }
}
//#endregion

//#region datetime
export class dateExtension {
  static diffInDays = (startDateVal, endDateVal) => {
    var startDate = new Date(startDateVal); //Default date format
    var endDate = new Date(endDateVal);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = endDate.getTime() - startDate.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  };

  static getUtcDateTime = (isoDate, locales = "en") => {
    const date = new Date(isoDate);
    // let d = Date.UTC(
    //   date.getFullYear(),
    //   date.getMonth(),
    //   date.getDate(),
    //   date.getHours(),
    //   date.getMinutes(),
    //   date.getSeconds()
    // );

    const localTime = date.toLocaleTimeString(locales, {
      timeStyle: "short",
    });
    const utcTime = date.getUTCHours() + ":" + date.getUTCMinutes();
    const data = {
      toISOString: isoDate,
      toUTCString: new Date(date.toUTCString().slice(0, -4)).toString(), // ignore the timezone
      local: {
        date: date.toLocaleDateString(locales),
        time: localTime,
      },
      utc: {
        time: utcTime,
      },
    };

    return data;

    // var curLocalDate = new Date(datetime);
    // var curlLocalMiliSec = curLocalDate.getTime();
    // var utcOffsetInMin = curLocalDate.getTimezoneOffset();
    // var utcOffsetInMiliSec = utcOffsetInMin * 60 * 1000;

    // var utcTime = new Date(curlLocalMiliSec + utcOffsetInMiliSec);

    // var utcHour = utcTime.getHours();
    // var utcMinutes = utcTime.getMinutes();

    // return {
    //   localTime: curLocalDate.getHours() + ":" + curLocalDate.getMinutes(),
    //   utcTime: utcHour + ":" + utcMinutes,
    // };
  };
}
//#endregion

//#region stores
export class storedExtension {
  static setCookie = (name, value, hours = 6) => {
    // var expires = "";
    // if (hours) {
    //   var date = new Date();
    //   //date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    //   date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    //   expires = "; expires=" + date.toUTCString();
    // }
    // document.cookie = name + "=" + (value || "") + expires + "; path=/";

    var date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    var options = {
      path: "/",
      // add other defaults here if necessary
      expires: date,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    storedExtension.removeCookie(name);
    document.cookie = updatedCookie;
  };
  static getCookie = (name) => {
    // var nameEQ = name + "=";
    // var ca = document.cookie.split(";");
    // for (var i = 0; i < ca.length; i++) {
    //   var c = ca[i];
    //   while (c.charAt(0) == " ") c = c.substring(1, c.length);
    //   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    // }
    // return null;
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
  static removeCookie = (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
}
//#endregion
