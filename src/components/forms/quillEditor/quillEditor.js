import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "./_quillEditor.scss";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import { modules, formats } from "./configs";
import { stringExtension } from "@utils/helpersExtension";
import axios from "axios";

const regexEditor = /<p><br><\/p>|<div><br><\/div>/g;
const Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);
Quill.register("modules/emoji", Emoji);

const ReactQuillEditor = (props) => {
  const { autoFocus, value, placeholder } = props;
  const quillRef = React.useRef();
  const [focus, setFocus] = React.useState(false);
  const [dataValue, setDataValue] = React.useState("");

  //#region get infos
  const getToolbars = React.useCallback(
    (name) => {
      const toolbars = {
        chatbox: () => {
          return {
            ...modules,
            toolbar: {
              ...modules.toolbar.chatbox,
              handlers: {
                ...modules.toolbar.handlers,
                send: (e) => {
                  props.submitHandler(e);
                },
              },
            },
            // wordCount: wordCountModule,
            "emoji-toolbar": false,
            "emoji-textarea": true,
            "emoji-shortname": true,
          };
        },
        default: () => {
          return {
            ...modules,
            toolbar: {
              ...modules.toolbar.default,
              handlers: {
                image: imageHandler,
              },
              // wordCount: wordCountModule,
            },
            "emoji-toolbar": false,
            "emoji-textarea": false,
            "emoji-shortname": true,
          };
        },
      };

      return toolbars[name ?? "default"]();
    },
    [props.toolbar]
  );

  const mods = React.useMemo(() => getToolbars(props.toolbar), []);

  // const wordCountModule = {
  //   init: function () {
  //     // This will refer to the Quill instance when initialized.
  //     this.quill.on(
  //       "text-change",
  //       function () {
  //         const text = this.quill.getText();
  //         const wordCount = text.split(/\s+/).filter(Boolean).length;
  //         console.log(`Word count: ${wordCount}`);
  //       }.bind(this)
  //     );
  //   },
  // };
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    if (autoFocus) setFocus(autoFocus);
    if (focus) quillRef.current.focus();
  }, [focus]);

  React.useEffect(() => {
    setDataValue(value);
  }, [value]);
  //#endregion

  //#region handle events
  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("file", file);
      // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      const response = await axios({
        method: "post",
        url: process.env.API_IMAGE_UPLOAD,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Save current cursor state
      const range = quillRef.current.getEditorSelection();
      // console.log(response.data.rs.filename);
      // Insert uploaded image
      quillRef.current
        .getEditor()
        .insertEmbed(
          range.index,
          "image",
          process.env.API_HOSTNAME + response.data.rs.filename
        );
    };
  };

  const handleOnChange = (content, delta, source, editor) => {
    let text = content.replace(regexEditor, "");
    text = stringExtension.stripedHtml(text);
    // text = stringExtension.stripedHtml(text);

    // formik.setFieldValue(field, text);

    setDataValue(text);
    if (typeof props.onChange === "function") {
      props.onChange(text);
    }
  };
  //#endregion

  return (
    <>
      <ReactQuill
        {...props}
        theme="snow"
        ref={quillRef}
        value={dataValue || ""}
        modules={mods}
        // formats={formats}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default ReactQuillEditor;
