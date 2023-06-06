import "./_home.scss";
import { hookInstance } from "@utils/hookInstance";

const Home = () => {
  const [darkMode, setDarkMode] = React.useState(
    colorTheme === "light" ? true : false
  );
  const [colorTheme, setTheme] = hookInstance.useDarkSide();

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return <>Home page</>;
};

export default Home;
