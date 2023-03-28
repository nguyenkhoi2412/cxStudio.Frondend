import encrypt from "@utils/encrypt.helper";
import {
  useReducer,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import queryString from "query-string";
// import * as _ from "lodash";

export class Helpers {
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
    return `${this.checkIsNotNull(pre) ? pre + "_" : ""}${
      new Date().getTime() + this.randomNumber()
    }`;
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
  static checkIsNotNull(data) {
    return data !== null && data !== undefined && !objectExtension.isEmpty(data);
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
    //     Helpers.detectEnvironment();
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
      .map((key) => {
        if (key === "query") {
          const encoded = encrypt.aes.encrypt(params[key]);
          return encoded;
        }
        return JSON.stringify(params[key]);
      })
      .join("&");

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
    //             let changes = Helpers.diffObjects(
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
    //       //   result[key] = Helpers.diffObjects(value, oldObj[key]);
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
    return Helpers.checkIsNotNull(value)
      ? langCode !== ""
        ? Helpers.checkIsNotNull(value[langCode])
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
  //#endregion
}
//#endregion

//#region files
export class fileExtension {
  static uploadfile = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
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
}
//#endregion

//#region stores
export class storedExtension {
  static setCookie = (name, value, hours = 4) => {
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

//#region useHooks instance
export class hooksInstance {
  /*
   * useWindowSize
   * Call hook when window resize
   * const [width, height] = useWindowSize();
   */
  static useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      const handleResize = Helpers.debounce(() => {
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
  };

  /*
   * useDrag
   */
  static useDrag = () => {
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
  };
  /*
   * useOnClickOutside
   * Call hook passing in the ref and a function to call on outside click
   * const [isModalOpen, setModalOpen] = useState(false);
   * useOnClickOutside(ref, () => setModalOpen(false));
   */
  static useOnClickOutside = (ref, handler) => {
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
  };

  /*
   * useHover
   * How to use it?
   * const [hoverRef, isHovered] = useHover();
   * <div ref={hoverRef} style={{backgroundColor: isHovered ? '#00e3e3' : '#ccc'}} ></div>
   */
  static useHover = () => {
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
  };

  /*
   * useLocalStorage
   * How to use it?
   * const [name, setName] = useLocalStorage();
   */
  static useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to React.useState so logic is only executed once
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of React.useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as React.useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  };

  /*
   * useRouter
   * How to use it?
   * const router = useRouter();
   * // Get value from query string (?postId=123) or route param (/:postId)
   * router.query.postId
   * // Get current pathname
   * router.pathname
   */
  static useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const history = useNavigate();
    const match = useMatch();
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
        match,
        location,
        history,
      };
    }, [params, match, location, history]);
  };

  /*
   * useNavigate
   * How to use it?
   * const { state, set, undo, redo, clear, canUndo, canRedo } = useNavigate({});
   */
  static useNavigate = (initialPresent) => {
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
  };
}

// Initial state that we pass into useReducer
const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Will contain "future" state values if we undo (so we can redo)
  future: [],
};
// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  const { past, present, future } = state;
  switch (action.type) {
    case "UNDO":
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case "REDO":
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case "SET":
      const { newPresent } = action;
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case "CLEAR":
      const { initialPresent } = action;
      return {
        ...initialState,
        present: initialPresent,
      };
  }
};
//#endregion
