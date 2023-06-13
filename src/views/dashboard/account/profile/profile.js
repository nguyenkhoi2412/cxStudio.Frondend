import "./_profile.scss";
import * as React from "react";
//#region utils support
import { useTranslation } from "react-i18next";
import { gridSpacing } from "@constants";
import { useTheme } from "@mui/material/styles";
import DocumentPdf from "@components/mui-ui/extended/documentPdf";
//#endregion

// material-ui
import { Grid } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import Typography from "@mui/material/Typography";

//#region components
import SubCard from "@components/mui-ui/cards/subCard";
import MainCard from "@components/mui-ui/cards";
import { t } from "i18next";
//#endregion
// ============================|| ACCOUNT SHADOW ||============================ //

const AccountProfile = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <React.Fragment>
      <MainCard
        title={t("user.accountprofile")}
        // secondary={
        //   <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        // }
      >
        <Grid
          container
          spacing={gridSpacing}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <SubCard
              contentClass={`pdf-reviewer`}
              sx={{
                textAlign: "center",
              }}
            >
              {/* <DocumentPdf /> */}
              <a
                href={
                  process.env.API_HOSTNAME +
                  "/uploads/Nguyen_Le_Minh_Khoi_cv.pdf"
                }
                target="_blank"
              >
                Curriculum Vitae
              </a>

              <Timeline
                position="alternate"
                className="timeline_profile"
                sx={{
                  mt: 1,
                }}
              >
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    <Typography variant="h2" component="p" sx={{ mb: 1 }}>
                      NGUYEN LE MINH KHOI
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>
                      Phone: +84938925905
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>
                      Email: nguyenkhoi2412@gmail.com
                    </Typography>
                    <Typography
                      color={theme.palette.grey[500]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      Address: 391TK 42/45 Tran Hung Dao, Cau Kho Ward, District
                      1, Ho Chi Minh, Vietnam
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      <ImportContactsOutlinedIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h3" component="p" sx={{ mb: 1 }}>
                      About me
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      I graduated from University of Technology and study in
                      higher diploma in software engineering. I have over 10
                      years experience in web application development,
                      especially in frontend web development. I develop HTML /
                      CSS / and javascript coding, making the site responsive
                      and friendlier to smaller devices is one of my main aims
                      as well as improving performance. Through the professional
                      knowledge I have and with my experience, I will try to do
                      the best job at the company. Constantly strive for
                      yourself and become the core employee of the company in
                      the coming time.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <Typography variant="h3" component="p" sx={{ mb: 1 }}>
                      Work history
                    </Typography>
                    <Typography
                      variant="h4"
                      component="p"
                      className="boxHeader"
                    >
                      Stepmedia Software Viet Nam
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      (01/2022 - Current: .NET Developer)
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Development website application using MVC, SQL Server on
                      basic platform .NET CORE, C#...
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Frontend is using REACTJS, SASS...
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Company product development Deloitte, write new features
                      reports, improve performance for APIs, troubleshooting to
                      perfect products...
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      <WorkHistoryOutlinedIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h2" component="p" sx={{ mb: 1 }}>
                      BASIC INFORMATION
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>
                      Birthday: 06/01/1983
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>
                      Nationality: Vietnamese
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>
                      Marital Status: Married
                    </Typography>
                    <Typography color={theme.palette.grey[500]}>
                      Gender: Male
                    </Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <Typography variant="h2" component="p" sx={{ mb: 1 }}>
                      SKILLS
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      Front end
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      jQuery
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      HTML
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      CSS Responsive Design
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      HTML5
                    </Typography>
                    <Typography
                      variant="h4"
                      color={theme.palette.grey[700]}
                      compoents="p"
                    >
                      Libraries UI: Material UI
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      Bootstrap
                    </Typography>
                    <Typography color={theme.palette.grey[500]} component="p">
                      Antd
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      {/* <IconActivity /> */}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography
                      variant="h4"
                      component="p"
                      className="boxHeader"
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      Orient Software Development Corp / CONEXUS VIET NAM
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      (11/2012 - 09/2020: Frontend Developer)
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Development website application using MVC, SQL Server on
                      basic platform .NET 4.0, 4.5... And my specialize is
                      develop UI with script, jquery, css...
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Programming vip24, competence project. A candidate must
                      pass a test presentation, after that, other counselor will
                      evaluation depend on your test, and they will give some
                      idea to help you ’nd out an opportunity develop.
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - moe project is a learning experience which aims to
                      provide students with the opportunity to synthesise
                      knowledge from various areas of learning, and critically
                      and creatively apply it to real life situations. This
                      process, which enhances students& knowledge and enables
                      them to acquire skills like collaboration, communication
                      and independent learning, prepares them for lifelong
                      learning and the challenges ahead.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <Typography
                      variant="h4"
                      component="p"
                      className="boxHeader"
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      Vien Nam Software
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      (06/2011 - 11/2012: Developer)
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Programing projects websites for clients (company
                      introduce, hot deals, e-commerce...).
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      Analysis, programming and development website application
                      on the basic platform .NET 2.0, 3.5, 4.0... using ASP.NET,
                      MVC, Entity Framework, Web services, html, jquery, css...
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      <SchoolOutlinedIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="h2" component="p" sx={{ mb: 1 }}>
                      EDUCATION
                    </Typography>
                    <Typography variant="h4" component="p">
                      Others - Aptech Scrool
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color={theme.palette.grey[500]}
                    >
                      (09/2001 - 08/2004: Expert programming)
                    </Typography>
                    <Typography
                      variant="h4"
                      component="p"
                      sx={{
                        mt: 1,
                      }}
                    >
                      College - University of Technology
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color={theme.palette.grey[500]}
                    >
                      (09/2001 - 08/2004: Information Technology)
                    </Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <Typography variant="h2" component="p" sx={{ mb: 1 }}>
                      CERTIFICATIONS
                    </Typography>
                    <Typography variant="h4" component="p">
                      Software Engineering
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color={theme.palette.grey[500]}
                    >
                      (2004: University Of Technology)
                    </Typography>
                    <Typography
                      variant="h4"
                      component="p"
                      sx={{
                        mt: 1,
                      }}
                    >
                      Higher diploma in software engineering
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      color={theme.palette.grey[500]}
                    >
                      (2004: FPT Aptech)
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      <WorkspacePremiumOutlinedIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography
                      variant="h4"
                      component="p"
                      className="boxHeader"
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      FPT Telecom
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      (01/2008 - 01/2010: Technical support)
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Support clients about ADSL, LAN, WAN. Check client&s
                      connection on system, check information and all services
                      assigned to clients.
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Support all problems that IT need to solve about Web
                      server, mail server, FTP, IP static, NAT and troubleshoot
                      IT&s problems.
                    </Typography>
                    <Typography
                      color={theme.palette.grey[700]}
                      sx={{ wordBreak: "break-word" }}
                    >
                      - Support all problems that IT need to solve about Web
                      server, mail server, FTP, IP static, NAT and troubleshoot
                      IT&s problems.
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </SubCard>
          </Grid>
        </Grid>
      </MainCard>
    </React.Fragment>
  );
};

export default AccountProfile;
