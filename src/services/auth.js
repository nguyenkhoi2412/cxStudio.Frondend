import axios from "@utils/axio.instance";
import encryptHelper from "@utils/encrypt.helper";
import storageHandler from "@constants/storageHandler";
import { ROLE } from "@constants/enumRoles";
import {
  helpersExtension,
  objectExtension,
  storedExtension,
} from "@utils/helpersExtension";

export default {
  findByUser: (params) => {
    return new Promise(async (resolve, reject) => {
      params.username = encryptHelper.rsa.encrypt(params.username);

      await axios
        .post(`auth/findbyuser/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  validateUser: (params) => {
    return new Promise(async (resolve, reject) => {
      params.username = encryptHelper.rsa.encrypt(params.username);
      params.password = encryptHelper.rsa.encrypt(params.password);

      await axios
        .get(objectExtension.parseToQueryString("auth/validate/", params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  signInGoogle: (params) => {
    return new Promise(async (resolve, reject) => {
      // get userinfos from google account
      const infoGoogle = await new Promise((resolve, reject) => {
        axios
          .get(`https://www.googleapis.com/oauth2/v3/userinfo/`, {
            withCredentials: false,
            headers: { Authorization: `Bearer ${params.access_token}` },
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });

      const userInfo = {
        username: encryptHelper.rsa.encrypt(infoGoogle.email),
        role: ROLE.USER.name,
        detailInfos: {
          firstName: infoGoogle.family_name ?? "",
          lastName: infoGoogle.given_name ?? "",
          avatarPath: infoGoogle.picture ?? "",
        },
      };
      //
      axios
        .post("auth/google/", userInfo)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  registerUser: (params) => {
    return new Promise((resolve, reject) => {
      params.username = encryptHelper.rsa.encrypt(params.username);
      params.password = encryptHelper.rsa.encrypt(params.password);

      axios
        .post(`auth/register/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  changePassword: (params) => {
    return new Promise((resolve, reject) => {
      // encrypt data
      params.currentUsername = encryptHelper.rsa.encrypt(
        params.currentUsername
      );
      params.currentPassword = encryptHelper.rsa.encrypt(
        params.currentPassword
      );
      params.usernameResetPassword = encryptHelper.rsa.encrypt(
        params.usernameResetPassword
      );
      params.newPassword = encryptHelper.rsa.encrypt(params.newPassword);

      axios
        .put(`auth/changepassword/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  recoveryPassword: (params) => {
    return new Promise((resolve, reject) => {
      params.username = encryptHelper.rsa.encrypt(params.username);

      axios
        .get(
          objectExtension.parseToQueryString(`auth/recoverypassword/`, params)
        )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  verified_2fa: (params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/secure_2fa/validate/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  getToken_2fa: (params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`auth/secure_2fa/gettoken/` + params.id)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
  refreshToken: (params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`auth/refreshtoken/`, params)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};
