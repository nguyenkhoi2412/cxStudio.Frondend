import axios from "@utils/axio.instance";

export default {
  fileUpload: (params) => {
    return new Promise((resolve, reject) => {
      // const configAxios = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      //   onUploadProgress: function (progressEvent) {
      //     var percentCompleted = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total
      //     );
      //     console.log(percentCompleted);
      //   },
      // };

      const { formData, type, identifyFolder, configAxios } = params;
      axios
        .post(
          `file/upload/` + type + "/" + identifyFolder,
          formData,
          configAxios
        )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
