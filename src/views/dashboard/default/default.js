import { hookInstance } from "@utils/hookInstance";
import { useTheme, styled } from "@mui/material/styles";
import MainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import ListArticles from "./articles";
import Button from "@mui/material/Button";
//#region components
import AnimateButton from "@components/mui-ui/extended/animateButton";

const Articles = [
  {
    title: "A message to our customers",
    upvotes: 12,
    date: "2020-01-24",
  },
  {
    title: "Alphabet earnings",
    upvotes: 22,
    date: "2019-11-23",
  },
  {
    title: "Artificial Mountains",
    upvotes: 2,
    date: "2019-11-22",
  },
  {
    title: "Scaling to 100k Users",
    upvotes: 72,
    date: "2019-01-21",
  },
  {
    title: "the Emu War",
    upvotes: 24,
    date: "2019-10-21",
  },
  {
    title: "What's SAP",
    upvotes: 1,
    date: "2019-11-21",
  },
  {
    title: "Simple text editor has 15k monthly users",
    upvotes: 7,
    date: "2010-12-31",
  },
];

const DashboardDefault = (props) => {
  const theme = useTheme();
  const [lsArticles, setLsArticles] = React.useState(Articles);
  const [sort, setSort] = React.useState(false);

  const sortListArticle = () => {
    setLsArticles(
      Articles.sort((a, b) =>
        sort ? a.upvotes - b.upvotes : b.upvotes - a.upvotes
      )
    );

    setSort(!sort);
  };

  return (
    <MainContentCardWrapper
      title={`Dashboard default`}
      secondary={
        <SecondaryAction
          link="https://mui.com/material-ui/material-icons/"
          color={theme.palette.background.default}
        />
      }
    >
      <AnimateButton>
        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={sortListArticle}
        >
          Sort
        </Button>
      </AnimateButton>
      <ListArticles articles={lsArticles} />
    </MainContentCardWrapper>
  );
};

export default DashboardDefault;
