import Resizer from "react-image-file-resizer";
import { stringHelper } from "@utils/string.helper";

export class fileHelper {
  // static uploadfile = (file, cb) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // };

  static downloadBlobFile = (blob, fileName) => {
    var a = document.createElement("a");
    a.href = blob;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = "display: none";
    a.click();
    a.remove();
  };

  static getExtension = (filename) => {
    return filename.substring(filename.lastIndexOf(".") + 1);
  };

  static getSizeImage = (file) => {
    return new Promise(function (resolve, reject) {
      var img;
      var reader = new FileReader();
      reader.onload = (r) => {
        img = new Image();
        img.src = r.target.result;

        img.onload = function () {
          resolve({
            code: 200,
            message: "",
            ok: true,
            d: {
              width: this.width,
              height: this.height,
              size: file.size,
            },
          });
        };
      };
      reader.readAsDataURL(file);
    });
  };

  static getImageBase64 = (file) => {
    const maxSize = 1 * 1024 * 1024; // 1Mb
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    return new Promise(function (resolve, reject) {
      if (!allowedExtensions.exec(file.name)) {
        resolve({
          code: 200,
          message:
            "File upload only supports the following filetypes - jpg, jpeg, png",
          ok: false,
        });
      }

      // check file size
      if (file.size > maxSize) {
        resolve({
          code: 200,
          message:
            "File too large - max size is " +
            stringHelper.formatBytes(maxSize),
          ok: false,
        });
      }
      const reader = new FileReader();
      reader.onload = (r) => {
        resolve({
          code: 200,
          message: "",
          ok: true,
          d: reader.result, // r.target.result
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  static getImageBase64Resized = (
    file,
    resizeAspect = 0.5,
    resizeQuality = 100
  ) => {
    const maxSize = 1 * 1024 * 1024; // 1Mb
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    return new Promise((resolve) => {
      // getSizeImage
      this.getSizeImage(file).then((rs) => {
        if (!allowedExtensions.exec(file.name)) {
          resolve({
            code: 200,
            message:
              "File upload only supports the following filetypes - jpg, jpeg, png",
            ok: false,
          });
        }

        // check file size
        if (rs.size > maxSize) {
          resolve({
            code: 200,
            message:
              "File too large - max size is " +
              stringHelper.formatBytes(maxSize),
            ok: false,
          });
        }

        // Resizer.imageFileResizer(
        //   file, // Is the file of the image which will resized.
        //   maxWidth, // Is the maxWidth of the resized new image.
        //   maxHeight, // Is the maxHeight of the resized new image.
        //   compressFormat, // Is the compressFormat of the resized new image.
        //   quality, // Is the quality of the resized new image.
        //   rotation, // Is the degree of clockwise rotation to apply to uploaded image.
        //   responseUriFunc, // Is the callBack function of the resized new image URI.
        //   outputType, // Is the output type of the resized new image.
        //   minWidth, // Is the minWidth of the resized new image.
        //   minHeight // Is the minHeight of the resized new image.
        // );

        Resizer.imageFileResizer(
          file,
          rs.width * resizeAspect,
          rs.height * resizeAspect,
          "JPEG",
          resizeQuality,
          0,
          (uri) => {
            resolve({
              code: 200,
              message: "",
              ok: true,
              d: uri,
            });
          },
          "base64"
        );
      });
    });
  };
}
