import "./_spin.scss";
import { Grid, CircularProgress } from "@mui/material";

function Spin({ load }) {
  return (
    <>
      {load ? (
        <div className="spin-loader">
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Spin;
