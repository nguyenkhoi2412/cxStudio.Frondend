import "./_laundry-service.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LaundryServices = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/dashboard");
  };

  return <div className="App">Laundry Services</div>;
};

export default LaundryServices;
