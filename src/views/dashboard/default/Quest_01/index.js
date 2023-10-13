import { hookInstance } from "@utils/hookInstance";
import { useTheme, styled } from "@mui/material/styles";
import SubCard from "@components/mui-ui/cards/subCard";
import MainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import InputField from "@components/forms/inputField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { gridSpacing } from "@constants";
//#region components
import AnimateButton from "@components/mui-ui/extended/animateButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  zIndex: 999,
};

const Quest_01 = (props) => {
  const theme = useTheme();
  const dataValue = "-1, -2, -3, -8, 0, 5, 7";
  const [arrayNumber, setArrayNumber] = React.useState(dataValue);
  const [maxValue, setMaxValue] = React.useState(0);
  const [maxValueIndex, setMaxValueIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const findIndexMaxNumber = () => {
    let maxValueTemp = 0;
    if (arrayNumber.length === 0) {
      setMaxValue(0);
      setMaxValueIndex(-1);
    }
    arrayNumber.split(",").map((value, index) => {
      const vaTemp = value.trim().replace(/\s/g, "");
      const va = parseInt(vaTemp);
      if (Number.isInteger(va) && Math.abs(maxValueTemp) < Math.abs(va)) {
        maxValueTemp = va;
        setMaxValue(va);
        setMaxValueIndex(index);
      }
    });
  };

  const handleOnChangeInputField = (e) => {
    setArrayNumber(e.target.value);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    findIndexMaxNumber();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid item xs={12}>
        <SubCard title="Tìm vị trí số nguyên có trị tuyệt đối lớn nhất">
          <Grid container direction="column" spacing={1}>
            <Box
              className="form"
              component="form"
              autoComplete="off"
              noValidate
              sx={{ mt: 1 }}
            >
              <InputField
                margin="normal"
                fullWidth
                type="text"
                tabIndex="1"
                label="Nhập vào mảng, cách nhau bằng dấu phẩy"
                name="textfield"
                onChange={(e) => handleOnChangeInputField(e)}
                setValue={dataValue}
                value={dataValue}
              />
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleOpen}
                >
                  Tìm vị trí giá trị tuyệt đối lớn nhất
                </Button>
              </AnimateButton>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Vị trí số nguyên có trị tuyệt đối lớn nhất của {maxValue} là:{" "}
                  {maxValueIndex}
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </SubCard>
      </Grid>
    </>
  );
};

export default Quest_01;
