import { object } from "@utils/crossCutting";
import InputField from "@components/mui-ui/forms/inputField";
import SelectField from "@components/mui-ui/forms/selectField";

const RenderField = ({ metadata, formik, renderType = "" }) => {
  React.useEffect(() => {}, []);

  //* Render data from metadata
  const builder = (item, index) => {
    let keyField = item.id + "_" + index;
    let errorText = object.getValue(formik, "errors." + item.field);
    let hasError =
      Boolean(object.getValue(formik, "touched." + item.field)) && errorText;
    let valueText = object.getValue(formik, "values." + item.field);

    var fieldType = {
      text: (
        <InputField
          margin="normal"
          fullWidth
          key={keyField}
          id={item.id}
          type={item.type}
          tabIndex={item.tabIndex}
          label={item.label}
          name={item.field}
          autoFocus={item.autoFocus}
          value={valueText}
          setValue={formik.setFieldValue}
          onChange={formik.handleChange}
          error={hasError}
          helperText={hasError ? errorText : ""}
          preventXSS={item.preventXSS}
          xs={item.xs}
          sm={item.sm}
        />
      ),
      select: (
        <SelectField
          key={keyField}
          id={item.id}
          type={item.type}
          tabIndex={item.tabIndex}
          label={item.label}
          name={item.field}
          disabled={item.disabled}
          value={valueText}
          listItems={item.listItems}
          setValue={formik.setFieldValue}
          onChange={formik.handleChange}
          error={hasError}
          helperText={hasError ? errorText : ""}
          xs={item.xs}
          sm={item.sm}
        />
      ),
    };

    return fieldType[item.type] || <></>;
  };

  return (
    <>
      {renderType === ""
        ? metadata?.map((item, index) => {
            return builder(item, index);
          })
        : metadata
            ?.filter((f) => f.renderType === renderType)
            .map((c) => {
              return builder(c);
            })}
    </>
  );
};

export default React.memo(RenderField, (props, nextProps) => {
  if (Object.is(props, nextProps))
    // return true if you don't need re-render
    return true;
});
