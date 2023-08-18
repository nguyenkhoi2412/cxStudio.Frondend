import "./_community.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/dashboard");
  };

  return <div className="App">Community</div>;
};

export default Community;
