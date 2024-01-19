import axios from "@utils/axio.instance";
import { object } from "@utils/crossCutting";
import BaseServices from "@services/_base.api";

export class StorageService extends BaseServices {
  //#region CALLBACK API
  /*
   * GET: Cookie from Backend
   */
  static getCookie = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`cookie/get`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };
  //#endregion
  //#region PROCESS DATA

  //#endregion
}
