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
      Community
    </div>
  );
};

export default Community;
