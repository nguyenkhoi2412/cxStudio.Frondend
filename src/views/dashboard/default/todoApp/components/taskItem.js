import "../_todoApp.scss";
import MainCard from "@components/mui-ui/cards";
import SecondaryAction from "@components/mui-ui/cards/cardSecondaryAction";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputField from "@components/mui-ui/forms/inputField";
import Button from "@mui/material/Button";
import { crossCutting, object } from "@utils/crossCutting";
import { gridSpacing } from "@constants";
//#region components
import { Draggable } from "react-beautiful-dnd";
import AnimateButton from "@components/mui-ui/extended/animateButton";
import { useFormik } from "formik";
import _schema from "./_schemaTaskItem";

const EditIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-dots-vertical"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
  </svg>
);

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-x"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M18 6l-12 12"></path>
    <path d="M6 6l12 12"></path>
  </svg>
);

const TaskItem = (props) => {
  const [itemValue, setItemValue] = React.useState();
  const [edited, setEdited] = React.useState(false);

  React.useEffect(() => {
    setItemValue(props.item);
  }, [props.item]);

  const handleEditTask = () => {
    setEdited(true);
  };

  const handleCloseEditTask = () => {
    setEdited(false);
  };

  const handleUpdateTaskChange = (e) => {
    e.preventDefault();

    if (submitting) return;

    setEnableValidation(true);
    formik.handleSubmit();
  };

  //#region useFormik
  const initialValues = _schema.initialValues(itemValue);
  const validationSchema = _schema.validation();
  const dataForm = _schema.dataForm();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      setSubmitting(true);

      crossCutting.simulateNetworkRequest(100).then(async () => {
        setItemValue(values);
        setEdited(false);
        setSubmitting(false);
        props.updateTodoData(values);
      });
    },
  });
  //#endregion

  const renderFormEditTask = () => {
    return (
      <Draggable
        key={itemValue?.id}
        draggableId={itemValue?.id}
        index={props.index}
      >
        {(provided) => (
          <Grid
            key={itemValue?.id}
            item
            xs={12}
            className="item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box
              className="form"
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={handleUpdateTaskChange}
              sx={{ mt: 1 }}
            >
              <MainCard
                title={
                  <InputField
                    margin="normal"
                    fullWidth
                    id={itemValue?.id + "1"}
                    type="text"
                    tabIndex="0"
                    label="Tiêu đề"
                    name="task"
                    autoFocus={true}
                    value={object.getValue(formik, "values.task")}
                    setValue={formik.setFieldValue}
                    onChange={(e) => {
                      formik.handleChange;
                    }}
                    error={
                      Boolean(
                        object.getValue(formik, "touched.task")
                      ) && object.getValue(formik, "errors.task")
                    }
                    helperText={
                      Boolean(
                        object.getValue(formik, "touched.task")
                      ) && object.getValue(formik, "errors.task")
                        ? object.getValue(formik, "errors.task")
                        : ""
                    }
                    preventXSS={true}
                    xs={12}
                    sm={12}
                  />
                }
                className="header-title"
                secondary={
                  <SecondaryAction
                    title="Edit"
                    icon={CloseIcon}
                    cb={handleCloseEditTask}
                  />
                }
              >
                <Grid
                  container
                  spacing={gridSpacing}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12} className="item-desc">
                    <InputField
                      margin="normal"
                      fullWidth
                      id={itemValue?.id + "2"}
                      type="text"
                      tabIndex="1"
                      label="Chi tiết"
                      name="desc"
                      autoFocus={true}
                      value={object.getValue(formik, "values.desc")}
                      setValue={formik.setFieldValue}
                      onChange={(e) => {
                        formik.handleChange;
                      }}
                      error={
                        Boolean(
                          object.getValue(formik, "touched.desc")
                        ) && object.getValue(formik, "errors.desc")
                      }
                      helperText={
                        Boolean(
                          object.getValue(formik, "touched.desc")
                        ) && object.getValue(formik, "errors.desc")
                          ? object.getValue(formik, "errors.desc")
                          : ""
                      }
                      preventXSS={true}
                      xs={12}
                      sm={12}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={gridSpacing}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12} className="item-act">
                    <Box sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          fullWidth
                          disabled={submitting}
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Update task
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Grid>
                </Grid>
              </MainCard>
            </Box>
          </Grid>
        )}
      </Draggable>
    );
  };

  const renderTaskItem = () => {
    if (!crossCutting.check.isNotNull(itemValue)) return <></>;

    return (
      <Draggable
        key={itemValue?.id}
        draggableId={itemValue?.id}
        index={props.index}
      >
        {(provided) => (
          <Grid
            key={itemValue?.id}
            item
            xs={12}
            className="item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <MainCard
              title={itemValue?.task}
              className="header-title"
              secondary={
                <SecondaryAction
                  title="Edit"
                  icon={EditIcon}
                  cb={handleEditTask}
                />
              }
            >
              <Grid
                container
                spacing={gridSpacing}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} className="item-desc">
                  {itemValue?.desc}
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        )}
      </Draggable>
    );
  };

  return <>{edited ? renderFormEditTask() : renderTaskItem()}</>;
};

export default TaskItem;
