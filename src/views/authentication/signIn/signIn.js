import * as React from "react";
import { useTranslation } from "react-i18next";
import _schema from "./_schema";
import { navigateLocation } from "@routes/navigateLocation";
//#region mui-ui
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
//#endregion
//#region components
import AuthWrapper from "../authWrapper";
import AuthCardWrapper from "../authCardWrapper";
import AuthMainContainer from "../authMainContainer";
import FormSignIn from "../forms/signIn";
import { crossCutting, loop } from "../../../utils/crossCutting";
// import AuthFooter from "../authFooter";
//#endregion

const SignIn = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  React.useEffect(() => {
    const arr = new Array(1000000).fill({
      activeUsers: 26,
      activeRooms: 19,
      rooms: [
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
        {
          name: "JavaScript",
          id: 17,
          lastPost: 1705329758,
          tags: [
            "ecmascript",
            "ecmascript-6",
            "javascript",
            "nodejs",
            "typescript",
          ],
          singleImage: false,
          messages: [
            {
              date: 1705329758,
              user: "Wietlol",
              userid: 2764866,
            },
          ],
          users: [
            {
              lastPost: 1705329758,
              name: "Wietlol",
              id: 2764866,
              emailhash: "!https://i.stack.imgur.com/cUip8.png?s=128&g=1",
            },
            {
              lastPost: 1705325201,
              name: "VLAZ",
              id: 3689450,
              emailhash: "!https://i.stack.imgur.com/hy0Bnl.png?s=128&g=1",
            },
            {
              lastPost: 1705295473,
              name: "Joe Saad",
              id: 1147977,
              emailhash: "!https://i.stack.imgur.com/4mxza.png?s=128&g=1",
            },
            {
              lastPost: 1705295451,
              name: "JamesBot",
              id: 11518920,
              emailhash: "!https://i.stack.imgur.com/DHbov.png?s=128&g=1",
            },
            {
              lastPost: 1705109708,
              name: "Parking Master",
              id: 17202960,
              emailhash: "!https://i.stack.imgur.com/kHCN5.png?s=128&g=1",
            },
            {
              lastPost: 1705088031,
              name: "ThiefMaster",
              id: 298479,
              emailhash: "bc66db28aa7c3fa8e4ce4238b696dee9",
            },
            {
              lastPost: 1702480831,
              name: "Cerbrus",
              id: 1835379,
              emailhash: "!https://i.stack.imgur.com/i63aC.gif?s=128&g=1",
            },
          ],
        },
      ],
    });
    // console.log("arr", arr);
    crossCutting.timeTaken(() => {
      var a1 = [];
      loop.every(
        arr,
        (item, index) => {
          a1[index] = item;
        },
        "forEach"
      );
    }, "FOREACH...");

    crossCutting.timeTaken(() => {
      var a1 = [];
      loop.every(
        arr,
        (item, index) => {
          a1[index] = item;
        },
        "for"
      );
    }, "FOR...");

    crossCutting.timeTaken(() => {
      var a1 = [];
      loop.every(
        arr,
        (item, index) => {
          a1[index] = item;
        },
        "doWhile"
      );
    }, "DO...WHILE");

    crossCutting.timeTaken(() => {
      var a1 = [];
      loop.every(
        arr,
        (item, index) => {
          a1[index] = item;
        },
        "while"
      );
    }, "WHILE...");
  }, []);

  return (
    <AuthWrapper>
      <AuthCardWrapper className="auth sign-in">
        <AuthMainContainer>
          <Grid item xs={12}>
            <Grid
              container
              direction={matchDownSM ? "column-reverse" : "row"}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography
                    color="primary"
                    gutterBottom
                    variant={matchDownSM ? "h3" : "h2"}
                  >
                    {t("authentication.hiwelcomeback")}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={matchDownSM ? "center" : "inherit"}
                  >
                    {t("authentication.enteryourcredentialstocontinue")}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormSignIn />
          </Grid>
          {/* <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Link
                href={navigateLocation.AUTH.SIGNUP}
                underline="none"
                variant="subtitle1"
                color={theme.palette.grey[900]}
              >
                {t("authentication.donthaveanaccount")}
              </Link>
            </Grid>
          </Grid> */}
        </AuthMainContainer>
      </AuthCardWrapper>
    </AuthWrapper>
  );
};

export default SignIn;
