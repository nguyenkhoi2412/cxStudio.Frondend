export class storedHelper {
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

    this.removeCookie(name);
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
