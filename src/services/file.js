// import axios from "@utils/axio.instance";
// import encryptHelper from "@utils/encrypt.helper";
// import { objectExtension } from "@utils/helpersExtension";

// export default {
//   fileUpload: (params) => {
//     return new Promise((resolve, reject) => {
//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       };
//       const { formData, type, identifyFolder } = params;
//       axios
//         .post(`file/upload/` + type + "/" + identifyFolder, formData, config)
//         .then((response) => resolve(response))
//         .catch((error) => reject(error));
//     });
//   },
// };
