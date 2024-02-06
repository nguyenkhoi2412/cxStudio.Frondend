import axios from "@utils/axio.instance";
import _axios from "axios";
import { object } from "@utils/crossCutting";
import { ROLE } from "@constants/role";
import BaseServices from "@services/_base.api";

export class WorkspaceService extends BaseServices {
  //#region CALLBACK API
  static getByUser = (params) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(object.parseToQueryString("workspace/getbyuser/", params))
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };
  //#endregion
  //#region PROCESS WORKSPACE
  static getOwner = async (params) => {
    return new Promise(async (resolve, reject) => {
      const { data, currentUser } = params;
      let wpOwner = [];

      wpOwner = await data?.filter((w) => {
        const owners = w.team_members?.filter(
          (t) => t.user._id === currentUser._id && t.role === ROLE.OWNER
        );

        if (owners?.length > 0) return w;
      });

      resolve(wpOwner);
    });
  };
  static getTeamMembers = async (params) => {
    return new Promise(async (resolve, reject) => {
      const { data, currentUser } = params;
      let wpTeams = [];

      wpTeams = await data?.filter((w) => {
        const teams = w.team_members?.filter(
          (t) => t.user._id === currentUser._id && t.role === ROLE.TEAM_MEMBERS
        );

        if (teams?.length > 0) return w;
      });

      resolve(wpTeams);
    });
  };
  //#endregion
}
