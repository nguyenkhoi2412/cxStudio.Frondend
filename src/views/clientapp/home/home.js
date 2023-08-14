import "./_home.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigage = useNavigate();

  return (
    <div className="App">
      <Button className="btn" variant="contained" onClick={() => navigage("/dashboard")}>
        Go to Dashboard
      </Button>
      <Button className="btn" variant="contained" onClick={() => navigage("/app/community")}>
        Go to Community
      </Button>
    </div>
  );
};

export default Home;
