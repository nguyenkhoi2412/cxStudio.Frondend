import "./_uploadFile.scss";
import { useTranslation } from "react-i18next";
import { IconButton, Typography, Button, Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import AnimateButton from "@components/mui-ui/extended/animateButton";
import { useDispatch, useSelector } from "react-redux";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "*.pdf"];

const UploadFile = (props) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  //#region handle events
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading file...", formData);
    } else {
      console.error("No file selected");
    }
  };
  //#endregion

  //#region render html
  const renderSelectedFiles = () => {
    return (
      <>
        {selectedFile && (
          <div>
            {/* <Typography variant="subtitle1" mt={2}>
              Selected Image:
            </Typography> */}
            <ul className="selected-files">
              <li key={selectedFile.name}>{selectedFile.name}</li>
              {/* {selectedFile.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))} */}
            </ul>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              mt={2}
            >
              {t("file.upload_files")}
            </Button>
          </div>
        )}
      </>
    );
  };
  //#endregion

  return (
    <>
      <Box className="uploadFile" textAlign="center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="image-file-input"
        />
        <label htmlFor="image-file-input">
          <AnimateButton>
            <Button
              className="btn-select-file"
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
            >
              {t("file.select_files")}
            </Button>
          </AnimateButton>
        </label>
        {renderSelectedFiles()}
        {error && (
          <Typography variant="body2" color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default UploadFile;
