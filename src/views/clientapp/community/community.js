import "./_community.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigage = useNavigate();

  const handleOnclick = () => {
    navigage("/dashboard");
  };

  return (
    <div className="App">
      Home us!!!
      <Button className="btn" variant="contained" onClick={handleOnclick}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default Community;
