export class stringHelper {
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
