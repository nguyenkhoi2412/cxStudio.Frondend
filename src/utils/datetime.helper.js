export class dateTimeHelper {
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