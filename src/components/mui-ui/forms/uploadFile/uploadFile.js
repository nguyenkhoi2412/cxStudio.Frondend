import "./_uploadFile.scss";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { hookInstance } from "@utils/hookInstance";
import { Typography, Button, Box, Alert, LinearProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import AnimateButton from "@components/mui-ui/extended/animateButton";
import { useDispatch } from "react-redux";
import { UPLOAD_FILE } from "@reduxproviders/file.reducer";

const MAX_FILE_SIZE_MB = 1;
const ALLOWED_FILE_TYPES = /jpeg|jpg|png/;

const UploadFile = React.forwardRef(
  ({ type, identifyFolder, hideUploadFileButton, ...others }, ref) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [textAlert, setTextAlert] = React.useState(null);
    const [alertSeverity, setAlertSeverity] = React.useState(null);
    const [progressUploadFileCompleted, setProgressUploadFileCompleted] =
      React.useState(0);
    const progressUploadFileThrottle = hookInstance.useThrottle(
      progressUploadFileCompleted,
      400
    );

    React.useImperativeHandle(ref, () => ({
      handleUploadFiles,
    }));

    //#region useHooks
    React.useEffect(() => {
      if (
        progressUploadFileCompleted > 0 &&
        progressUploadFileCompleted < 100
      ) {
        setTextAlert(
          t("file.files_processing") + " " + progressUploadFileCompleted + "%"
        );
        setAlertSeverity("info");
      }

      if (progressUploadFileCompleted === 100) {
        setSelectedFile(null);
        setTextAlert(t("file.upload_complete"));
        setAlertSeverity("success");
      }
    }, [progressUploadFileCompleted]);
    //#endregion

    //#region handle events
    const acceptFileExtension = (file, filetypes = ALLOWED_FILE_TYPES) => {
      var mimetype = filetypes.test(file.type);
      var extname = filetypes.test(file.name);

      return mimetype && extname;
    };

    const handleValidateFileCheck = (event) => {
      let file = null;
      let fileSize = 0;

      if (type === "multiple") {
        file = Array.from(event.target.files).filter((f) => {
          if (acceptFileExtension(f)) {
            fileSize += f.size;
            return f;
          }
        });

        // File type validation
        if (file?.length === 0) {
          setTextAlert(t("validate.pls_upload_file_image"));
          setAlertSeverity("error");
          return;
        }
      } else {
        file = event.target.files[0];
        fileSize = file.size;

        // File type validation
        if (!ALLOWED_FILE_TYPES.test(file.type)) {
          // setTextAlert("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
          setTextAlert(t("validate.pls_upload_file_image"));
          setAlertSeverity("error");
          return;
        }
      }

      // File size validation
      if (fileSize > MAX_FILE_SIZE_MB * 1024 * 1024) {
        // setTextAlert(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`);
        setTextAlert(
          t("validate.file_size_exeed").replace(
            "{{MAX_FILE_SIZE_MB}}",
            MAX_FILE_SIZE_MB
          )
        );
        setAlertSeverity("error");
        return;
      }

      setSelectedFile(file);
      setTextAlert(null);
      setAlertSeverity(null);
    };

    const handleUploadFiles = async () => {
      if (!selectedFile) return;

      // prepare data
      const formData = new FormData();
      if (type === "multiple") {
        selectedFile.map((file) => {
          formData.append("multiple", file);
        });
      } else {
        formData.append("single", selectedFile);
      }

      // callback api us axios
      const configAxios = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setProgressUploadFileCompleted(percentCompleted);
        },
        onDownloadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
        },
      };

      return new Promise(async (resolve, reject) => {
        await dispatch(
          UPLOAD_FILE({
            type: type || "single",
            formData: formData,
            identifyFolder: identifyFolder || "anonymous",
            configAxios: configAxios,
          })
        )
          .unwrap()
          .then((result) => {
            resolve(result.rs);
          });
      });
    };
    //#endregion

    //#region render html
    const renderInputFile = () => {
      const inputType = {
        multiple: (
          <input
            multiple
            name="multiple"
            type="file"
            // accept="image/*"
            onChange={handleValidateFileCheck}
            hidden
            id="image-file-input"
          />
        ),
        single: (
          <input
            name="single"
            type="file"
            // accept="image/*"
            onChange={handleValidateFileCheck}
            hidden
            id="image-file-input"
          />
        ),
      };

      return inputType[type || "single"];
    };

    const renderSelectedFiles = () => {
      return (
        <>
          {selectedFile && (
            <div>
              <ul className="selected-files">
                {type === "multiple" ? (
                  selectedFile.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))
                ) : (
                  <li key={selectedFile.name}>{selectedFile.name}</li>
                )}
              </ul>
              {hideUploadFileButton ? (
                <></>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUploadFiles}
                  mt={2}
                >
                  {t("file.upload_files")}
                </Button>
              )}
            </div>
          )}
        </>
      );
    };
    //#endregion

    return (
      <>
        <Box className="uploadFile" textAlign="center">
          {renderInputFile()}
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
          {textAlert && (
            <>
              {alertSeverity === "info" ? (
                <>
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progressUploadFileThrottle}
                    />
                  </Box>
                </>
              ) : (
                <></>
              )}
              <Typography variant="body2" mt={2} component="div">
                <Alert severity={alertSeverity || "error"}>{textAlert}</Alert>
              </Typography>
            </>
          )}
        </Box>
      </>
    );
  }
);

UploadFile.propTypes = {
  type: PropTypes.string,
  identifyFolder: PropTypes.string,
  hideUploadFileButton: PropTypes.bool,
};

UploadFile.defaultProps = {
  type: "single",
  identifyFolder: "anonymous",
  hideUploadFileButton: false,
};

// export default UploadFile;
export default React.memo(UploadFile, (props, nextProps) => {
  if (JSON.stringify(props) === JSON.stringify(nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
