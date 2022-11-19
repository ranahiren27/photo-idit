import React, { useState } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

function App() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [imgUrl, setImgURL] = useState(null);
  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  return (
    <div>
      <input
        type="url"
        placeholder="Enter image URL"
        onChange={(e) => setImgURL(e.target.value)}
      />
      {imgUrl && (
        <button onClick={openImgEditor}>Open Filerobot image editor</button>
      )}{" "}
      {isImgEditorShown && (
        <FilerobotImageEditor
          source={imgUrl}
          onSave={(editedImageObject, designState) => {
            console.log("saved", editedImageObject, designState);
            const downloadLink = document.createElement("a");
            downloadLink.href = editedImageObject.imageBase64;
            downloadLink.download = editedImageObject.fullName;
            downloadLink.click();
          }}
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: "#ff0000",
          }}
          Text={{ text: "Filerobot..." }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
      )}
    </div>
  );
}

export default App;
