import "./_emojiPicker.scss";
import Picker from "@emoji-mart/react";
import { init, SearchIndex, Data } from "emoji-mart";

const EmojiPicker = (props) => {
  //#region handle events
  const handleOnEmojiSelect = (emojiObject) => {
    if (typeof props.onEmojiSelect === "function") {
      props.onEmojiSelect(emojiObject);
    }
  };

  //#endregion
  return (
    <>
      <Picker
        {...props}
        set="twitter"
        onEmojiSelect={handleOnEmojiSelect}
        emojiButtonRadius="12px"
        emojiButtonSize={32}
        emojiSize={20}
        maxFrequentRows={2}
        perLine={8}
        previewPosition="none"
        skinTonePosition="none"
        // emojiButtonColors={[
        //   "rgba(155,223,88,.7)",
        //   "rgba(149,211,254,.7)",
        //   "rgba(247,233,34,.7)",
        //   "rgba(238,166,252,.7)",
        //   "rgba(255,213,143,.7)",
        //   "rgba(211,209,255,.7)",
        // ]}
        // theme={customization.mode}
        // locale={_globalVars.locale.lang}
      />
    </>
  );
};

export default React.memo(EmojiPicker, (props, nextProps) => {
  if (JSON.stringify(props) === JSON.stringify(nextProps)) {
    // return true if you don't need re-render
    return true;
  }
});
