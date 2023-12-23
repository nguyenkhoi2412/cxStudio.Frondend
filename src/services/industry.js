import axios from "@utils/axio.instance";
import _axios from "axios";

export class IndustryService {
  //#region CALLBACK API
  static getAll = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get("industry/getall/")
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };
  //#endregion
}
