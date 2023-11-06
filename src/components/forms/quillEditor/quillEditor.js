import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "./_quillEditor.scss";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import { modules, formats } from "./configs";
import axios from "axios";

const Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);
Quill.register("modules/emoji", Emoji);

const ReactQuillEditor = (props) => {
  const { autoFocus, value, onChange, placeholder } = props;
  const quillRef = React.useRef();
  const [focus, setFocus] = React.useState(false);

  const getToolbars = React.useCallback(
    (name) => {
      console.log("sdfsdfdsf", name);
      const toolbars = {
        default: () => {
          return {
            ...modules.toolbar.default,
            handlers: {
              image: imageHandler,
            },
          };
        },
        chatbox: () => {
          return { ...modules.toolbar.chatbox };
        },
      };

      return toolbars[name ?? "default"]();
    },
    [props.toolbar]
  );

  const mods = React.useMemo(
    () => ({
      ...modules,
      toolbar: getToolbars(props.toolbar),
      "emoji-toolbar": false,
      "emoji-textarea": props.toolbar === "chatbox" ? true : false,
      "emoji-shortname": true,
    }),
    []
  );

  React.useEffect(() => {
    if (autoFocus) setFocus(autoFocus);
    if (focus) quillRef.current.focus();
  }, [focus]);

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

  return (
    <>
      <ReactQuill
        {...props}
        theme="snow"
        ref={quillRef}
        value={value || ""}
        modules={mods}
        // formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default ReactQuillEditor;
