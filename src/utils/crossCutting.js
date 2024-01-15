// get from localStorage.getItem("locale")// locale get from data site/locale
// locale = {
//   _id: "36cb8e3e-9167-42a9-9dce-877541901e2d",
//   lang: "en",
//   code: "en-EN",
//   language_name: "English",
//   date_format: "MM-DD-YYYY",
//   time_format: "HH:mm",
//   currency: "$",
// }
import _globalVars from "@constants/variables";
import * as React from "react";
import {
  useReducer,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import queryString from "query-string";

//* ==============================|| CROSSCUTTING ||============================== //
export const crossCutting = {
  //#region generate
  generate: {
    uuidv4: () => {
      var dt = new Date().getTime();
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    },
    key: (pre) => {
      return `${crossCutting.check.isNotNull(pre) ? pre + "_" : ""}${
        new Date().getTime() + crossCutting.generate.number()
      }`;
    },
    password: (length = 8) => {
      let password = "";
      const chars = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz",
        "@$!%*?&",
        "1234567890",
      ];
      const charsLength = chars.length;
      let j = 0;
      do {
        const charsJ = chars[j];
        const charsJLen = charsJ.length;
        password += charsJ.charAt(Math.floor(Math.random() * charsJLen));
        j++;
      } while (j < charsLength);
      if (length > charsLength) {
        length = length - charsLength;
        let i = 0;
        do {
          const index = Math.floor(Math.random() * charsLength);
          password += chars[index].charAt(
            Math.floor(Math.random() * chars[index].length)
          );
          i++;
        } while (i < length);
      }
      return password
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("");
    },
    number: (min = 1, max = 100) => {
      return min + Math.random() * (max - min);
    },
    color: (color = "") => {
      switch (color) {
        //* Generate light color
        case "light":
          var letters = "BCDEF".split("");
          var letterLen = letters.length;
          var color = "#";
          var i = 0;
          while (i < 6) {
            color += letters[Math.floor(Math.random() * letterLen)];
            i++;
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
            i = 0;
          while (i < 3) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(
              16
            );
            rgb += ("00" + c).substr(c.length);

            i++;
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
    },
  },
  //#endregion
  //#region check
  check: {
    isNotNull: (value) => {
      return !crossCutting.check.isNull(value);
    },
    isNull: (value) => {
      return (
        value === null ||
        value === undefined ||
        (typeof value === "string"
          ? string.isEmptyOrWhitespace(value) // check string is EMPTY
          : Array.isArray(value)
          ? array.isEmpty(value) // check Array is EMPTY
          : object.isEmpty(value)) // check Object is EMPTY
      );
    },
    isEquals: (a, b) => {
      if (crossCutting.check.isNull(a) && crossCutting.check.isNull(b))
        return true;

      if (a === b) return true;
      if (JSON.stringify(a) === JSON.stringify(b)) return true;
      if (typeof a === "function" && typeof b === "function") return true;

      if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();

      if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
        return a === b;

      if (a.prototype !== b.prototype) return false;

      const keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length) return false;

      return (
        // array compare with object
        keys.every((k) => crossCutting.check.isEquals(a[k], b[k]))
        // || array
        // (a.length === b.length &&
        //   a.every(
        //     (element, index) =>
        //       element === b[index] ||
        //       JSON.stringify(element) === JSON.stringify(b[index])
        //   )) ||
        // Object.is(a, b)
      );
    },
    acceptFileExtension: (file, filetypes = /jpeg|jpg|png/) => {
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      return mimetype && extname;
    },
  },
  //#endregion
  //#region simulate
  debounce: (func, wait = 400) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  },
  simulateNetworkRequest: (timer = 2000) => {
    return new Promise((resolve) => setTimeout(resolve, timer));
  },
  detectEnvironment: () => {
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

      var id = 0;
      var csLength = clientStrings.length;

      while (id < csLength) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
        }

        id++;
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
  },
  timeTaken: (callback, message) => {
    console.time("Time taken for " + message + ": ");
    const r = callback();
    console.timeEnd("Time taken for " + message + ": ");
    return r;
  },
  //#endregion
};

//* ==============================|| VALIDATE ||============================== //
export const validate = {
  password: (value) => {
    if (value.length < 6) {
      return "Password should be at-least 6 characters.";
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
    ) {
      return "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.";
    }
    return true;
  },
  isEmailValid: (address) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address),
};

//* ==============================|| STRING ||============================== //
export const string = {
  render: (value, langCode = "", defaultValue = "-") => {
    // get lang code from localStorage locale
    if (crossCutting.check.isNull(langCode)) {
      langCode = _globalVars.locale.lang;
    }

    return crossCutting.check.isNotNull(value)
      ? langCode !== ""
        ? crossCutting.check.isNotNull(value[langCode])
          ? value[langCode]
          : defaultValue
        : value
      : defaultValue;
  },
  /**
   * isEmptyOrWhitespace(' '); // true
   * isEmptyOrWhitespace('\t\n\r'); // true
   */
  isEmptyOrWhitespace: (value) =>
    typeof value === "string" && /^\s*$/.test(value),

  stripedHtml: (text) => {
    text = text.replace(/[<|>]/gi, "");

    if (
      text.toLowerCase().indexOf("javascript") > -1 ||
      text.toLowerCase().indexOf("&lt;") > -1 ||
      text.toLowerCase().indexOf("&gt;") > -1
    ) {
      text = text.replace(/[javascript|&lt;|&gt;]/gi, "");
    }

    return text;
  },

  /**
   * unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'); // '<a href="#">Me & you</a>'
   */
  escapeHTML: (str) =>
    str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[tag] || tag)
    ),

  unescapeHTML: (str) =>
    str.replace(
      /&amp;|&lt;|&gt;|&#39;|&quot;/g,
      (tag) =>
        ({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&#39;": "'",
          "&quot;": '"',
        }[tag] || tag)
    ),

  mungeEmailAddress: (text) => {
    var i = text.indexOf("@");
    var startIndex = (i * 0.2) | 0;
    var endIndex = (i * 0.9) | 0;
    return (
      text.slice(0, startIndex) +
      text.slice(startIndex, endIndex).replace(/./g, "*") +
      text.slice(endIndex)
    );
  },
  parseValueToBool: (value) => {
    return value === true || value === "true" || value === "True";
  },
  numberWithSympol: (value, dot = ",", decimal_point = 0) => {
    let valueCheck = isNaN(value) ? 0 : parseFloat(value);

    return valueCheck
      .toFixed(decimal_point)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + dot);
  },
  compactNumber: (value) => {
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
  },
  formatBytes: (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
  },
  //* RANK
  ordinalSuffix: (number) => {
    let j = number % 10;
    let k = number % 100;
    if (j == 1 && k != 11) {
      return `${number}st`;
    }

    if (j == 2 && k != 12) {
      return `${number}nd`;
    }

    if (j == 3 && k != 13) {
      return `${number}rd`;
    }

    return `${number}th`;
  },
  copyToClipboard: (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },

  /**
   * Some case: camel/pascal/kebad/snake/title/sentence
   * convertCase('mixed_string with spaces_underscores-and-hyphens', 'camel'); // 'mixedStringWithSpacesUnderscoresAndHyphens'
   * convertCase('mixed_string with spaces_underscores-and-hyphens', 'pascal'); // 'MixedStringWithSpacesUnderscoresAndHyphens'
   * convertCase('mixed_string with spaces_underscores-and-hyphens', 'kebab'); // 'mixed-string-with-spaces-underscores-and-hyphens'
   * convertCase('mixed_string with spaces_underscores-and-hyphens', 'snake'); // 'mixed_string_with_spaces_underscores_and_hyphens'
   * convertCase('mixed_string with spaces_underscores-and-hyphens', 'title'); // 'Mixed String With Spaces Underscores And Hyphens'
   * convertCase('mixed_string with spaces_underscores-and-hyphens', 'sentence'); // 'Mixed string with spaces underscores and hyphens'
   */
  convertCase: (str, toCase = "camel") => {
    if (!str) return "";

    const delimiter =
      toCase === "snake"
        ? "_"
        : toCase === "kebab"
        ? "-"
        : ["title", "sentence"].includes(toCase)
        ? " "
        : "";

    const transform = ["camel", "pascal"].includes(toCase)
      ? (x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()
      : ["snake", "kebab"].includes(toCase)
      ? (x) => x.toLowerCase()
      : toCase === "title"
      ? (x) => x.slice(0, 1).toUpperCase() + x.slice(1)
      : (x) => x;

    const finalTransform =
      toCase === "camel"
        ? (x) => x.slice(0, 1).toLowerCase() + x.slice(1)
        : toCase === "sentence"
        ? (x) => x.slice(0, 1).toUpperCase() + x.slice(1)
        : (x) => x;

    const words = str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    );

    return finalTransform(words.map(transform).join(delimiter));
  },

  /**
   * truncateStringAtWhitespace
   */
  truncateStringAtWhitespace: (str, lim, ending = "...") => {
    if (str.length <= lim) return str;
    const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(" ");
    return (
      str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending
    );
  },

  /**
   * truncateStringAtWord
   */
  truncateStringAtWord: (str, lim, locale = "en-US", ending = "...") => {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
    let lastWordBreak = -1;

    const segStr = segmenter.segment(str);
    const strLength = segStr.length;
    const stt = 0;
    do {
      const word = segStr[stt];
      if (word.isWordLike) continue;
      if (word.index >= lim) break;
      lastWordBreak = word.index;
      stt++;
    } while (stt < strLength);

    return str.slice(0, lastWordBreak) + ending;
  },
};

//* ==============================|| OBJECT ||============================== //
export const object = {
  // getValue: (object, keys) =>
  //   keys.split(".").reduce((o, k) => (o || {})[k], object),

  /**
   * Get nested object property from path string
   * const obj = {
   *   selector: { to: { val: 'val to select' } },
   *   target: [1, 2, { a: 'test' }],
   * };
   * get(obj, 'selector.to.val', 'target[0]', 'target[2].a'); // ['val to select', 1, 'test']
   *
   */
  getValue: (obj, ...selectors) => {
    const rs = [...selectors].map((item) =>
      item
        .replace(/\[([^\[\]]*)\]/g, ".$1.")
        .split(".")
        .filter((t) => t !== "")
        .reduce((prev, cur) => prev && prev[cur], obj)
    );
    if (rs?.length === 1) {
      return rs[0];
    }

    return rs;
  },

  isEmpty: (obj) => {
    let isE =
      obj === null || obj === undefined || !(Object.keys(obj) || obj).length;
    if (isE) return true;

    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  },

  isEquals: (a, b) => {
    return crossCutting.check.isEquals(a, b);
  },

  //* QUERY
  parseToQueryString: (url, params) =>
    url +
    Object.keys(params)
      .map((key) => params[key])
      .join("&"),

  createQueryString: (url, queryObject) => {
    // url +
    // Object.keys(params)
    //   .map((key) => params[key])
    //   .join("&");
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
    return url + (queryString ? `?${queryString}` : "");
  },

  queryStringToObject: (queryString = "", options = {}) => {
    let queryObject = {};
    queryString &&
      decodeURIComponent(queryString.replace("?", ""))
        .split("&")
        .map((itemString) => {
          let [itemKey, itemValue] = itemString.split("=");
          if (options.hasOwnProperty(itemKey)) {
            if (!queryObject[itemKey] && Array.isArray(options[itemKey])) {
              queryObject[itemKey] = [];
            }
            Array.isArray(options[itemKey])
              ? queryObject[itemKey].push(itemValue)
              : (queryObject[itemKey] =
                  typeof options[itemKey] === "number"
                    ? parseInt(itemValue)
                    : itemValue);
          }
        });
    return queryObject;
  },

  //* GET DIFF/COMPARE
  getDiff: (baseObj, newObj) => {
    const isNativeType1 = typeof baseObj !== "object";
    const isNativeType2 = typeof newObj !== "object";
    if (isNativeType1 && isNativeType2) {
      return baseObj === newObj ? null : newObj;
    }
    if (isNativeType1 && !isNativeType2) {
      return newObj;
    }
    if (!isNativeType1 && isNativeType2) {
      return newObj;
    }
    const isArray1 = Array.isArray(baseObj);
    const isArray2 = Array.isArray(newObj);
    if (isArray1 && isArray2) {
      const firstLenght = baseObj.length;
      const secondLenght = newObj.length;
      const hasSameLength = firstLenght === secondLenght;
      if (!hasSameLength) return newObj;
      let hasChange = false;
      let indexArr = 0;
      do {
        const element1 = baseObj[indexArr];
        const element2 = newObj[indexArr];
        const changed = object.getDiff(element1, element2);
        if (changed) {
          hasChange = true;
        }

        indexArr++;
      } while (indexArr < firstLenght);

      return hasChange ? newObj : null;
    }
    if (isArray1 || isArray2) return newObj;
    const keys1 = Object.keys(baseObj);
    const keys2 = Object.keys(newObj);
    const keys1Len = keys1.length;
    const keys2Len = keys2.length;
    const hasSameKeys = keys1Len === keys2Len;
    if (!hasSameKeys) {
      const retObj = { ...newObj };
      let indexKey = 0;
      do {
        const key = keys1[indexKey];
        if (!keys2.includes(key)) {
          retObj[key] = null;
          // eslint-disable-next-line no-continue
          continue;
        }
        delete retObj[key];

        indexKey++;
      } while (indexKey < keys1Len);

      return retObj;
    }
    let hasChange = false;
    const retObj = {};

    let index = 0;
    do {
      const key = keys1[index];
      const element1 = baseObj[key];
      const element2 = newObj[key];
      const changed = object.getDiff(element1, element2);
      if (changed) {
        hasChange = true;
      }
      if (changed) {
        retObj[key] = changed;
      }
      index++;
    } while (index < keys1Len);

    return hasChange ? retObj : null;
  },

  /**
   * const obj = { a: 1, b: '2', c: 3 };
   * pick(obj, ['a', 'c']); // { 'a': 1, 'c': 3 }
   */
  pick: (obj, arr) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k))),

  /**
   * const obj = { a: 1, b: '2', c: 3 };
   * omit(obj, ['b']); // { 'a': 1, 'c': 3 }
   */
  omit: (obj, arr) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => !arr.includes(k))),

  // Check if the input is a json object (whether startsWidth '{' and endsWidth '}') or not
  isJsonObject: (text) => {
    let str = String(text).trim();

    if (!str.startsWith("{") || !str.endsWith("}")) return false;

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  },

  /**
   * use an object as an array
   * const x = toKeyedArray({ a: 'A', b: 'B' });
   */
  toKeyedArray: (obj) => {
    const methods = {
      map(target) {
        return (callback) =>
          Object.keys(target).map((key) => callback(target[key], key, target));
      },
      reduce(target) {
        return (callback, accumulator) =>
          Object.keys(target).reduce(
            (acc, key) => callback(acc, target[key], key, target),
            accumulator
          );
      },
      forEach(target) {
        return (callback) =>
          Object.keys(target).forEach((key) =>
            callback(target[key], key, target)
          );
      },
      filter(target) {
        return (callback) =>
          Object.keys(target).reduce((acc, key) => {
            if (callback(target[key], key, target)) acc[key] = target[key];
            return acc;
          }, {});
      },
      slice(target) {
        return (start, end) => Object.values(target).slice(start, end);
      },
      find(target) {
        return (callback) => {
          return (Object.values(target).find(([key, value]) =>
            callback(value, key, target)
          ) || [])[0];
        };
      },
      findKey(target) {
        return (callback) =>
          Object.keys(target).find((key) => callback(target[key], key, target));
      },
      includes(target) {
        return (val) => Object.values(target).includes(val);
      },
      keyOf(target) {
        return (value) =>
          Object.keys(target).find((key) => target[key] === value) || null;
      },
      lastKeyOf(target) {
        return (value) =>
          Object.keys(target)
            .reverse()
            .find((key) => target[key] === value) || null;
      },
    };
    const methodKeys = Object.keys(methods);

    const handler = {
      get(target, prop, receiver) {
        if (methodKeys.includes(prop)) return methods[prop](...arguments);
        const [keys, values] = [Object.keys(target), Object.values(target)];
        if (prop === "length") return keys.length;
        if (prop === "keys") return keys;
        if (prop === "values") return values;
        if (prop === Symbol.iterator)
          return function* () {
            for (value of values) yield value;
            return;
          };
        else return Reflect.get(...arguments);
      },
    };

    return new Proxy(obj, handler);
  },
};

//* ==============================|| ARRAY ||============================== //
export const array = {
  /**
   * Insert new item into an array
   * @params array: original array
   * @params index: index position append new item
   * @params items: item insert
   */
  insert: (currentArray, index, items) => {
    return [
      ...currentArray.slice(0, index),
      ...items,
      ...currentArray.slice(index),
    ];
  },
  update: (arr, newItem, field = "_id") => {
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
  },
  delete: (arr, objItems) => {
    let tempArray = [...arr];
    if (Array.isArray(objItems)) {
      // delete multiple objectItems
      var itemLength = objItems?.length || 0;
      let i = 0;
      do {
        let indexItem = array.findIndex(tempArray, objItems[i]);
        tempArray.splice(indexItem, 1);

        i++;
      } while (i < itemLength);
      return tempArray;
    }

    // Find index from objItems
    let indexItem = array.findIndex(tempArray, objItems);
    tempArray.splice(indexItem, 1);
    return tempArray;
  },
  removeDuplicate: (currentArray) => {
    return [...new Set(currentArray)];
  },
  shuffle: (array) => {
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
  },
  /**
   * Find index by binarySearch
   * findIndex([1, 2, 3, 4, 5], 5); // 4
   */
  findIndex: (arr, item) => {
    let l = 0,
      r = arr.length - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const guess = arr[mid];
      if (guess === item) return mid;
      if (guess > item) r = mid - 1;
      else l = mid + 1;
    }
    return -1;
  },
  /**
   * Find index of all
   * indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0, 3]
   * indexOfAll([1, 2, 3], 4); // []
   */
  findIndexOfAll: (arr, val) =>
    arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []),
  /**
   * array.combine
   * How to use it?
   * const x = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Maria' }
    ];
   * const y = [
      { id: 1, age: 28 },
      { id: 3, age: 26 },
      { age: 3}
    ];
   *
   * combine(x, y, 'id');
   */
  combine: (a, b, prop) =>
    Object.values(
      [...a, ...b].reduce((acc, v) => {
        if (v[prop])
          acc[v[prop]] = acc[v[prop]] ? { ...acc[v[prop]], ...v } : { ...v };
        return acc;
      }, {})
    ),
  // Check if the input is a json array (whether startsWidth '[' and endsWidth ']') or not
  isJsonArray: (text) => {
    let str = String(text).trim();
    return str.startsWith("[") && str.endsWith("]");
  },
  mergeArrayObjects: (current, newArray, field = "_id") => {
    const rsAdd = newArray.filter(
      ({ [field]: id1 }) => !current.some(({ [field]: id2 }) => id2 === id1)
    );
    const rsRemoved = current.filter(
      ({ [field]: id1 }) => !newArray.some(({ [field]: id2 }) => id2 === id1)
    );
    const rsUpdated = newArray.filter(({ [field]: id1, ...rest1 }) =>
      current.some(
        ({ [field]: id2, ...rest2 }) =>
          id2 === id1 && JSON.stringify(rest1) !== JSON.stringify(rest2)
      )
    );

    let tempArray = [...current];
    // Delete in current
    if (rsRemoved?.length > 0) {
      tempArray = array.delete(tempArray, rsRemoved, field);
    }

    // Update data for current array
    const rsUpdatedLen = rsUpdated?.length;
    if (rsUpdatedLen > 0) {
      let i = 0;
      do {
        tempArray = array.update(tempArray, rsUpdated[i], field);
        i++;
      } while (i < rsUpdatedLen);
    }

    // Insert new item for current array
    if (rsAdd?.length > 0) {
      tempArray = array.insert(tempArray, tempArray.length, rsAdd);
    }

    return {
      isChanged:
        rsAdd?.length > 0 || rsUpdated?.length > 0 || rsRemoved?.length > 0,
      originalList: current,
      newList: tempArray,
      inserted: rsAdd,
      updated: rsUpdated,
      deleted: rsRemoved,
    };
  },
  buildHierarchy: (array = [], idField = "_id", parentField = "parent") => {
    let arr = [...array];
    let arrMap = new Map(arr.map((item) => [item[idField], item]));
    let tree = [];
    let tempItem = [];
    let arrLength = arr.length;
    let i = 0;
    do {
      let item = arr[i];

      if (item[parentField] !== "") {
        let parentItem = arrMap.get(item[parentField]);

        if (parentItem) {
          parentItem = {
            ...parentItem,
            children: [...parentItem.children, item],
          };

          tempItem.push(parentItem);
        }
      } else {
        tree.push(item);
      }

      i++;
    } while (i < arrLength);

    tempItem.map((item) => {
      tree = crossCutting.array.update(tree, item);
    });

    return tree;
  },
  isEquals: (a, b) => {
    return crossCutting.check.isEquals(a, b);
  },
  isEmpty: (array) => {
    //If  not an array, return FALSE.
    if (!Array.isArray(array)) {
      return false;
    }
    //If it is an array, check its length property
    if (array?.length === 0) {
      //Return TRUE if the array is empty
      return true;
    }
    //Otherwise, return FALSE.
    return false;
  },
  /**
   * array.orderBy
   * How to use it?
   * [{ name: 'fred', age: 48 },
   * { name: 'barney', age: 36 },
   * { name: 'fred', age: 40 }]
   * orderBy(users, ['name', 'age'], ['asc', 'desc']);
   */
  orderBy: (arr, props, orders) =>
    [...arr].sort((a, b) =>
      props.reduce((acc, prop, i) => {
        if (acc === 0) {
          const [p1, p2] =
            orders && orders[i] === "desc"
              ? [b[prop], a[prop]]
              : [a[prop], b[prop]];
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
        }
        return acc;
      }, 0)
    ),
  chunks: (currentArray, chunk_size) => {
    var results = [];
    var arrayLength = currentArray.length;

    while (arrayLength) {
      results.push(currentArray.splice(0, chunk_size));
    }

    return results;
  },
  /**
   * Partition array in two
   * const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'barn', age: 75, active: true },
      { user: 'fred', age: 40, active: true },
    ];
    array.partition(users, o => o.active);
   */
  partition: (arr, fn) =>
    arr.reduce(
      (acc, val, i, arr) => {
        acc[fn(val, i, arr) ? 0 : 1].push(val);
        return acc;
      },
      [[], []]
    ),
};

export const loop = {
  /**
   * use loop increase performance depend on array's length
   * @param arr
   * @param func callback function
   * @param type doWhile, while, for, forEach
   */
  every: (arr, func, type = "auto", conditionBreak = null) => {
    if (typeof func !== "function") return;

    // const isBreak = (index) => conditionBreak && eval(conditionBreak);
    const arrLength = arr.length;
    let index = 0;

    var loop = {
      doWhile: () => {
        do {
          const item = arr[index];
          func(item, index);

          index++;
          // if (isBreak(index)) break;
        } while (index < arrLength);
      },
      while: () => {
        while (index < arrLength) {
          const item = arr[index];
          func(item, index);

          index++;
          // if (isBreak(index)) break;
        }
      },
      for: () => {
        for (let i = 0; i < arrLength; i++) {
          const item = arr[i];
          func(item, i);
        }
      },
      forEach: () => {
        arr.forEach((item, i) => {
          func(item, i);
        });
      },
    };

    // callback function with type
    if (type === "auto") {
      if (arrLength <= 1000000) {
        loop["while"]();
      } else {
        loop["for"]();
      }
    } else loop[type || "doWhile"]();
  },
};

//* ==============================|| DATETIME ||============================== //
export const datetime = {
  diffInDays: (startDateVal, endDateVal) => {
    var startDate = new Date(startDateVal); //Default date format
    var endDate = new Date(endDateVal);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = endDate.getTime() - startDate.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  },

  getUtcDateTime: (isoDate, locales = "en") => {
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
  },

  /**
   * Check date input is valid?
   * isDateValid('December 17, 1995 03:24:00'); // true
   * isDateValid('1995-12-17T03:24:00'); // true
   * isDateValid(1995, 11, 17); // true
   * isDateValid('1995-12-17 T03:24:00'); // false
   * isDateValid('Duck'); // false
   * isDateValid(1995, 11, 17, 'Duck'); // false
   * isDateValid({}); // false
   */
  isDateValid: (...val) => !Number.isNaN(new Date(...val).valueOf()),

  /**
   * Check days of work in week
   *
   */
  isWeekday: (date) => date.getDay() % 6 !== 0,

  /**
   * toTimestamp(new Date('2024-01-04')); // 1704326400
   */
  toTimestamp: (date) => Math.floor(date.getTime() / 1000),

  /**
   * fromTimestamp(1704326400); // 2024-01-04T00:00:00.000Z
   */
  fromTimestamp: (timestamp) => new Date(timestamp * 1000),

  /**
   * getTimeFromDate(new Date()); // '08:38:00'
   */
  getTimeFromDate: (date) => date.toTimeString().slice(0, 8),

  /**
   * daysAgo(20); // 2023-12-17 (if current date is 2024-01-06)
   */
  daysAgo: (n) => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d;
  },

  /**
   * daysFromToday(20); 2024-01-26 (if current date is 2024-01-06)
   */
  daysFromToday: (n) => {
    let d = new Date();
    d.setDate(d.getDate() + Math.abs(n));
    return d;
  },

  /**
   * dayOfYear(new Date('2024-09-28')); // 272
   */
  dayOfYear: (date) =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86_400_000),

  /**
   * quarterOfYear(new Date('2024-09-28')); // 3
   */
  weekOfYear: (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    startOfYear.setDate(startOfYear.getDate() + (startOfYear.getDay() % 7));
    return Math.round((date - startOfYear) / 604_800_000);
  },

  /**
   * weekOfYear(new Date('2021-06-18')); // 23
   */
  quarterOfYear: (date) => Math.ceil((date.getMonth() + 1) / 3),

  /**
   * daysInMonth(2020, 12)); // 31
   * daysInMonth(2024, 2)); // 29
   */
  daysInMonth: (year, month) => new Date(year, month, 0).getDate(),

  /**
   * const dates = [
   *  new Date('2017-05-13'),
   *  new Date('2018-03-12'),
   *  new Date('2016-01-10'),
   *  new Date('2016-01-09')
   * ];
   * minDate(...dates); // 2016-01-09
   * maxDate(...dates); // 2018-03-12
   */
  minDate: (...dates) => new Date(Math.min(...dates)),
  maxDate: (...dates) => new Date(Math.max(...dates)),

  /**
   * monthOfYear(new Date('2024-09-28')); // 9
   */
  monthOfYear: (date) => date.getMonth() + 1,

  //#region add time todate
  /**
   * addSecondsToDate(new Date('2020-10-19 12:00:00'), 10); // 2020-10-19 12:00:10
   */
  addSecondsToDate: (date, n) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 1000);
    return d;
  },

  /**
   * addMinutesToDate('2020-10-19 12:00:00', 10); // 2020-10-19 12:10:00
   */
  addMinutesToDate: (date, n) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 60_000);
    return d;
  },

  /**
   * addHoursToDate('2020-10-19 12:00:00', 10); // 2020-10-19 22:00:00
   */
  addHoursToDate: (date, n) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 3_600_000);
    return d;
  },

  /**
   * addDaysToDate('2020-10-19 12:00:00', 10); // 2020-10-29 12:00:00
   */
  addDaysToDate: (date, n) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  },

  /**
   * addWeekDays('2020-10-05', 5); // 2020-10-12
   */
  addWeekDays: (date, n) => {
    const s = Math.sign(n);
    const d = new Date(date);
    return Array.from({ length: Math.abs(n) }).reduce((currentDate) => {
      currentDate = addDaysToDate(currentDate, s);
      while (!datetime.isWeekday(currentDate))
        currentDate = addDaysToDate(currentDate, s);
      return currentDate;
    }, d);
  },
  //#endregion
};

//* ==============================|| HOOKS ||============================== //
export const hook = {
  useDocumentTitle: (title) => {
    React.useEffect(() => {
      document.title = title;
    }, [title]);
  },

  /*
   * useDarkMode
   */
  useDarkMode: () => {
    const [theme, setTheme] = React.useState(localStorage.themeMode);
    const colorTheme = theme === "dark" ? "light" : "dark";

    React.useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      document.body.classList.remove(colorTheme);

      root.classList.add(theme);
      document.body.classList.add(theme);

      localStorage.setItem("themeMode", theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
  },

  /*
   * useThrottle
   * Throttling enforces a maximum number of times a function can be called over time
   * How to use it?
   * const [value, setValue] = useState("hello");
   * const throttledValue = useThrottle(value, 1000);
   * <p>Throttled value: {throttledValue}</p>
   * If we setValue success, this value will process (change/call API) after 1000ms = 1s
   */
  useThrottle: (value, limit) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
      const handler = setTimeout(function () {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    }, [value, limit]);

    return throttledValue;
  },

  /*
   * useWindowSize
   * Call hook when window resize
   * const [width, height] = useWindowSize();
   */
  useWindowSize: () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      const handleResize = crossCutting.debounce(() => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 1000);
      // Add event listener
      window.addEventListener("resize.windowResize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () =>
        window.removeEventListener("resize.windowResize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  },

  /*
   * useDrag
   */
  useDrag: () => {
    const [clicked, setClicked] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const position = React.useRef(0);

    const dragStart = React.useCallback((ev) => {
      position.current = ev.clientX;
      setClicked(true);
    }, []);

    const dragStop = React.useCallback(
      () =>
        // NOTE: need some delay so item under cursor won't be clicked
        window.requestAnimationFrame(() => {
          setDragging(false);
          setClicked(false);
        }),
      []
    );

    const dragMove = (ev, cb) => {
      const newDiff = position.current - ev.clientX;

      const movedEnough = Math.abs(newDiff) > 5;

      if (clicked && movedEnough) {
        setDragging(true);
      }

      if (dragging && movedEnough) {
        position.current = ev.clientX;
        cb(newDiff);
      }
    };

    return {
      dragStart,
      dragStop,
      dragMove,
      dragging,
      position,
      setDragging,
    };
  },

  /**
   * useClickOutside
   * Call hook passing in the ref and a function to call on outside click
   * const [isModalOpen, setModalOpen] = useState(false);
   * useClickOutside(ref, () => setModalOpen(false));
   */
  useClickOutside: (ref, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }

          handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  },

  /*
   * useOnScreen
   * Call hook passing in the ref
   * const ref = useRef(null);
   * const isVisible = useOnScreen(ref);
   * console.log(isVisible);
   */
  useOnScreen: (ref, rootMargin = "0px") => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        {
          rootMargin,
        }
      );

      const currentElement = ref?.current;

      if (currentElement) {
        observer.observe(currentElement);
      }

      return () => {
        observer.unobserve(currentElement);
      };
    });

    return isVisible;
  },

  /*
   * useHover
   * How to use it?
   * const [hoverRef, isHovered] = useHover();
   * <div ref={hoverRef} style={{backgroundColor: isHovered ? '#00e3e3' : '#ccc'}} ></div>
   */
  useHover: () => {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener("mouseover", handleMouseOver);
          node.addEventListener("mouseout", handleMouseOut);

          return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
          };
        }
      },
      [ref.current] // Recall only if ref changes
    );

    return [ref, value];
  },

  /*
   * useMousePosition
   * How to use it?
   * const [x, y, bind] = useMousePosition();
   * <Wrapper
      {...bind}
      style={{
        transform: `rotateX(${x / 15}deg) rotateY(${y / -15}deg)`
      }}
     >
      ...
   * </Wrapper
   *
   */
  useMousePosition: () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const bind = useMemo(
      () => ({
        onMouseMove: (event) => {
          setX(event.nativeEvent.offsetX);
          setY(event.nativeEvent.offsetY);
        },
      }),
      []
    );

    return [x, y, bind];
  },

  /**
   * useOnGlobalEvent
   * How to use it?
   * useOnGlobalEvent('mousemove', e => {
   *  console.log(`(${e.x}, ${e.y})`);
   * });
   */
  useOnGlobalEvent: (type, callback, options) => {
    const listener = React.useRef(null);
    const previousProps = React.useRef({ type, options });

    React.useEffect(() => {
      const { type: previousType, options: previousOptions } = previousProps;

      if (listener.current) {
        window.removeEventListener(
          previousType,
          listener.current,
          previousOptions
        );
      }

      listener.current = window.addEventListener(type, callback, options);
      previousProps.current = { type, options };

      return () => {
        window.removeEventListener(type, listener.current, options);
      };
    }, [callback, type, options]);
  },

  /*
   * useRouter
   * How to use it?
   * const router = useRouter();
   * // Get value from query string (?postId=123) or route param (/:postId)
   * router.query.postId
   * // Get current pathname
   * router.pathname
   */
  useRouter: () => {
    const params = useParams();
    const location = useLocation();
    const history = useNavigate();
    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => {
      return {
        // For convenience add push(), replace(), pathname at top level
        push: history.push,
        replace: history.replace,
        pathname: location.pathname,
        // Merge params and parsed query string into single "query" object
        // so that they can be used interchangeably.
        // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
        query: {
          ...queryString.parse(location.search), // Convert string to object
          ...params,
        },
        // Include match, location, history objects so we have
        // access to extra React Router functionality if needed.
        location,
        history,
      };
    }, [params, location, history]);
  },

  /*
   * useNavigate
   * How to use it?
   * const { state, set, undo, redo, clear, canUndo, canRedo } = useNavigate({});
   */
  useNavigate: (initialPresent) => {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
      present: initialPresent,
    });
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
    // Setup our callback functions
    // We memoize with useCallback to prevent unnecessary re-renders
    const undo = useCallback(() => {
      if (canUndo) {
        dispatch({ type: "UNDO" });
      }
    }, [canUndo, dispatch]);
    const redo = useCallback(() => {
      if (canRedo) {
        dispatch({ type: "REDO" });
      }
    }, [canRedo, dispatch]);
    const set = useCallback(
      (newPresent) => dispatch({ type: "SET", newPresent }),
      [dispatch]
    );
    const clear = useCallback(
      () => dispatch({ type: "CLEAR", initialPresent }),
      [dispatch]
    );
    // If needed we could also return past and future state
    return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
  },

  /*
   * usePrevious
   * How to use it?
   * const [count, setCount] = useState(0);
   * const prevCount = usePrevious(count);
   */
  usePrevious: (value) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  },

  /*
   * useToggle
   * How to use it?
   * const [isTextChanged, setIsTextChanged] = useToggle();
   * <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
   */
  useToggle: (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState((state) => !state), []);

    return [state, toggle];
  },

  /*
   * useTimeout
   * How to use it?
   * const ready = useTimeout(2000);
   * useEffect(() => {
   *  process anything after ready is 2s
   * }, [ready])
   */
  useTimeout: (ms = 0) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
      let timer = setTimeout(() => {
        setReady(true);
      }, ms);

      return () => {
        clearTimeout(timer);
      };
    }, [ms]);

    return ready;
  },

  /**
   * useInterval
   * How to use it?
   * const { start, stop } = useInterval({
   *  duration: 1000,
   *  startImmediate: false,
   *  callback: () => {
   *     process func
   *   }
   * });
   */
  useInterval: ({ startImmediate, duration, callback }) => {
    const [count, updateCount] = useState(0);
    const [intervalState, setIntervalState] = useState(
      startImmediate === undefined ? true : startImmediate
    );
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
      if (intervalState) {
        const intervalId = setInterval(() => {
          updateCount(count + 1);
          callback && callback();
        }, duration);
        setIntervalId(intervalId);
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
      };
    }, [intervalState, count]);
    return {
      intervalId,
      start: () => {
        setIntervalState(true);
      },
      stop: () => {
        setIntervalState(false);
      },
    };
  },

  /*
   * useHistory
   * How to use it?
   * const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});
   * <button onClick={undo} disabled={!canUndo}>
      Undo
     </button>
   */
  useHistory: (initialPresent) => {
    const [state, dispatch] = useReducer(reducer, {
      ...initialState,
      present: initialPresent,
    });
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
    // Setup our callback functions
    // We memoize with useCallback to prevent unnecessary re-renders
    const undo = useCallback(() => {
      if (canUndo) {
        dispatch({ type: "UNDO" });
      }
    }, [canUndo, dispatch]);
    const redo = useCallback(() => {
      if (canRedo) {
        dispatch({ type: "REDO" });
      }
    }, [canRedo, dispatch]);
    const set = useCallback(
      (newPresent) => dispatch({ type: "SET", newPresent }),
      [dispatch]
    );
    const clear = useCallback(
      () => dispatch({ type: "CLEAR", initialPresent }),
      [dispatch]
    );
    // If needed we could also return past and future state
    return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
  },

  /*
   * useKeyPress
   * How to use it?
   * const happyPress = useKeyPress("h");
   * {happyPress && "😊"}
   */
  useKeyPress: (targetKey) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState < boolean > false;
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
  },

  /**
   * useSession
   * How to use it?
   * const { session, saveJWT, clear } = useSession("storage-key");
   */
  useSession: (sessionKey, keepOnWindowClosed = false) => {
    if (!sessionKey) {
      throw new Error(
        "sessionKey was not provided to useSession hook. Example: useSession('facebook-session')"
      );
    }

    const getStorage = () => {
      return keepOnWindowClosed ? localStorage : sessionStorage;
    };
    const getStorageValue = () => {
      try {
        const storageValue = getStorage().getItem(sessionKey);
        if (storageValue != null) {
          // There is a session in the storage already
          try {
            const session = JSON.parse(storageValue);
            return session;
          } catch (_a) {
            // Oops... It seems it wasn't an object, returning as String then
            return storageValue;
          }
        }
      } catch (_b) {
        // This catch block handles the known issues listed here: https://caniuse.com/#feat=namevalue-storage
        console.warn(
          "useSession could not access the browser storage. Session will be lost when closing browser window"
        );
      }
      return null;
    };
    const [state, setState] = useState(getStorageValue);
    const save = (sessionValue) => {
      if (typeof sessionValue == "object" || typeof sessionValue === "string") {
        getStorage().setItem(sessionKey, JSON.stringify(sessionValue));
        setState(sessionValue);
      } else {
        throw new Error(
          "useSession hook only accepts objects or strings as session values"
        );
      }
    };

    const saveJWT = (jwt) => {
      try {
        const base64Url = jwt.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        save(JSON.parse(window.atob(base64)));
      } catch (ex) {
        throw new Error("Could not parse provided Json Web Token: " + ex);
      }
    };

    const clear = () => {
      getStorage().removeItem(sessionKey);
      setState(null);
    };
    const syncState = (event) => {
      if (event.key === sessionKey) {
        setState(getStorageValue());
      }
    };
    useEffect(() => {
      window.addEventListener("storage", syncState);
      return () => {
        window.removeEventListener("storage", syncState);
      };
    }, [sessionKey]);
    return { session: state, save, saveJWT, clear };
  },

  /**
   * useLocalStorage
   * How to use it?
   * const { session, saveJWT, clear } = useLocalStorage("storage-key");
   */
  useLocalStorage: (sessionKey) => {
    return hook.useSession(sessionKey, true);
  },

  /**
   * useWindowScrollPosition
   * How to use it?
   * const { x, y } = useWindowScrollPosition();
   */
  useWindowScrollPosition: (options = {}) => {
    const { throttleMs = 100 } = options;
    const [scroll, setScroll] = React.useState({
      x: window.pageXOffset,
      y: window.pageYOffset,
    });

    const handle = crossCutting.debounce(() => {
      setScroll({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    }, throttleMs);

    React.useEffect(() => {
      window.addEventListener("scroll", handle);

      return () => {
        window.removeEventListener("scroll", handle);
      };
    }, []);

    return scroll;
  },

  /**
   * useHash
   * How to use it?
   * const [hash, setHash] = useHash();
   */
  useHash: () => {
    const [hash, setHash] = React.useState(() => window.location.hash);

    const hashChangeHandler = React.useCallback(() => {
      setHash(window.location.hash);
    }, []);

    React.useEffect(() => {
      window.addEventListener("hashchange", hashChangeHandler);
      return () => {
        window.removeEventListener("hashchange", hashChangeHandler);
      };
    }, []);

    const updateHash = React.useCallback(
      (newHash) => {
        if (newHash !== hash) window.location.hash = newHash;
      },
      [hash]
    );

    return [hash, updateHash];
  },

  /**
   * useCopyToClipboard
   * How to use it?
   * const [copied, copy] = useCopyToClipboard('Lorem ipsum');
   * <button onClick={copy}>Click to copy</button>
   * <span>{copied && 'Copied!'}</span>
   */
  useCopyToClipboard: (text) => {
    const copyToClipboard = (str) => {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      const success = document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return success;
    };

    const [copied, setCopied] = React.useState(false);

    const copy = React.useCallback(() => {
      if (!copied) setCopied(copyToClipboard(text));
    }, [text]);
    React.useEffect(() => () => setCopied(false), [text]);

    return [copied, copy];
  },

  /**
   * useDimensions
   * How to use it?
   * const [dimensions, ref] = hook.useDimensions();
   * <div ref={ref}>html content</div>
   */
  useDimensions: () => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [dimensions, setDimensions] = useState({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    });

    // The following measures the size of the div and listens to changes
    const elementRef = useRef();
    const RESET_TIMEOUT = 100;

    const getDimensions = () => {
      if (elementRef.current === undefined) return;
      const height = elementRef.current.offsetHeight;
      const width = elementRef.current.offsetWidth;

      const left = elementRef.current.offsetLeft;
      const top = elementRef.current.offsetTop;

      const bottom = top + height;
      const right = left + width;

      setDimensions({
        ...dimensions,
        height,
        width,
        left,
        top,
        bottom,
        right,
      });
    };

    useLayoutEffect(() => {
      getDimensions();
    }, []);

    const debouncedDimensions = crossCutting.debounce(
      getDimensions,
      RESET_TIMEOUT
    );

    useEffect(() => {
      window.addEventListener("resize", debouncedDimensions);
      window.addEventListener("scroll", debouncedDimensions);
      return () => {
        window.removeEventListener("resize", debouncedDimensions);
        window.removeEventListener("scroll", debouncedDimensions);
      };
    });

    return [{ dimensions }, elementRef];
  },

  /**
   * useArray
   * How to use it?
   * const { array, set, push, filter, insertAtPos, update, removeFromPos, clear } = useArray([1, 2, 3, 4, 5, 6])
   * <button onClick={() => push(7)}>Add 7</button>
   * <button onClick={() => update(1, 9)}>Change Second Element To 9</button>
   * <button onClick={() => remove(1)}>Remove Second Element</button>
   * <button onClick={() => filter(n => n < 3)}>
   *   Keep Numbers Less Than 4
   * </button>
   * <button onClick={() => set([1, 2])}>Set To 1, 2</button>
   * <button onClick={clear}>Clear</button>
   */
  useArray: (defaultValue) => {
    const [array, setArray] = useState(defaultValue);

    const push = (newElement) =>
      setArray((currentArray) => [...currentArray, newElement]);

    const filter = (callback) =>
      setArray((currentArray) => currentArray.filter(callback));

    const insertAtPos = (index, newElement) => {
      setArray((currentArray) => [
        ...currentArray.splice(index + 1, 0, ...newElement),
      ]);
    };

    const update = (index, newElement) => {
      setArray((currentArray) => [
        ...currentArray.slice(0, index),
        newElement,
        ...currentArray.slice(index + 1, currentArray.length),
      ]);
    };

    const removeFromPos = (newElement) => {
      var index = currentArray.indexOf(newElement);
      setArray((currentArray) => [
        ...currentArray.slice(0, index),
        ...currentArray.slice(index + 1, currentArray.length),
      ]);
    };

    const clear = () => setArray([]);

    return {
      array,
      set: setArray,
      push,
      filter,
      insertAtPos,
      update,
      removeFromPos,
      clear,
    };
  },
};

//* ==============================|| SESSION ||============================== //
export const storage = {
  cookie: {
    set: (name, value, hours = 6) => {
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
      const optsLen = options.length;
      let i = 0;

      do {
        const optionKey = options[i];
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }

        i++;
      } while (i < optsLen);

      storage.cookie.del(name);
      document.cookie = updatedCookie;
    },
    get: (name) => {
      // var nameEQ = name + "=";
      // var ca = document.cookie.split(";");
      // var i = 0;
      // var caLen = ca.length;
      // while (i < caLen) {
      //   var c = ca[i];
      //   while (c.charAt(0) == " ") c = c.substring(1, c.length);
      //   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      //   i++;
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
    },
    del: (name) => {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
  },
  local: {
    set: (key, data) => {
      localStorage.removeItem(key);
      localStorage.setItem(
        key,
        typeof data === "string" ? data : JSON.stringify(data)
      );
    },
    get: (key) => {
      if (crossCutting.check.isNull(localStorage.getItem(key)))
        return undefined;
      return typeof data === "string"
        ? localStorage.getItem(key)
        : JSON.parse(localStorage.getItem(key));
    },
    del: (key) => {
      localStorage.removeItem(key);
    },
  },
  /**
   * Memoization increase speed process in javascript
   * const fibonacci = n => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
   * const memoizedFibonacci = memoize(fibonacci);
   *
   */
  memoize: (fn) => {
    const cache = new Map();
    const cached = function (val) {
      return cache.has(val)
        ? cache.get(val)
        : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
  },
};
