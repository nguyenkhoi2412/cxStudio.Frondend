// assets
import { Trans } from "react-i18next";
import { navigateLocation } from "@routes/navigateLocation";
import { IconAB2, IconApps, IconBook } from "@tabler/icons-react";
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const surveyin = {
  id: "app",
  title: <Trans i18nKey={`survey.surveys`} />,
  // caption: "Application settings",
  type: "group",
  children: [
    // QUESTIONS
    {
      id: "questions",
      title: <Trans i18nKey={"survey.questions"}></Trans>,
      type: "item",
      icon: IconAB2,
      url: navigateLocation.SURVEY.QUESTION,
      target: false,
      breadcrumbs: false,
    },
    // ANSWERS
    {
      id: "answers",
      title: <Trans i18nKey={"survey.answers"}></Trans>,
      type: "item",
      icon: IconApps,
      url: navigateLocation.SURVEY.ANSWER,
      target: false,
      breadcrumbs: false,
    },
    // COURSE
    {
      id: "course",
      title: <Trans i18nKey={"survey.organize_courses"}></Trans>,
      type: "item",
      icon: IconBook,
      url: navigateLocation.SURVEY.ORGANIZE_COURSE,
      target: false,
      breadcrumbs: false,
    },
  ],
};

export default surveyin;
