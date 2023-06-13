// assets
import { Trans } from "react-i18next";
import { navigateLocation } from "@routes/navigateLocation";
import { BsUiChecksGrid } from "react-icons/bs";
import { ImSpellCheck } from "react-icons/im";
import { SiTablecheck } from "react-icons/si";
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
      icon: ImSpellCheck,
      url: navigateLocation.SURVEY.QUESTION,
      target: false,
      breadcrumbs: false,
    },
    // ANSWERS
    {
      id: "answers",
      title: <Trans i18nKey={"survey.answers"}></Trans>,
      type: "item",
      icon: BsUiChecksGrid,
      url: navigateLocation.SURVEY.ANSWER,
      target: false,
      breadcrumbs: false,
    },
    // COURSE
    {
      id: "course",
      title: <Trans i18nKey={"survey.organize_courses"}></Trans>,
      type: "item",
      icon: SiTablecheck,
      url: navigateLocation.SURVEY.ORGANIZE_COURSE,
      target: false,
      breadcrumbs: false,
    },
  ],
};

export default surveyin;
