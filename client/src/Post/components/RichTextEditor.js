import React, {useState, useRef} from "react";
import ImageList from "./ImageList";
import Modal from "@material-ui/core/Modal";
import ModalContent from "../../util/components/ModalContent";
import {stateToHTML} from "draft-js-export-html";

import {Editor, EditorState, RichUtils, AtomicBlockUtils} from "draft-js";

const RichTextEditor = ({images, setContent}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef(null);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    setContent(html);
  };

  const handleCustomButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImageSelection = (selectedImage) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {src: selectedImage}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity},
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    handleModalClose();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleToolbarButtonClick = (style) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div>
      {!!images.length && (
        <div>
          <button onClick={handleCustomButtonClick}>Select Image</button>
        </div>
      )}
      <div>
        <button onClick={() => handleToolbarButtonClick("BOLD")}>Bold</button>
        <button onClick={() => handleToolbarButtonClick("ITALIC")}>
          Italic
        </button>
        <button onClick={() => handleToolbarButtonClick("UNDERLINE")}>
          Underline
        </button>
      </div>
      <div style={{border: "1px solid green"}}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={blockRenderer}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent onModalClose={() => handleModalClose()}>
          <ImageList
            images={images}
            selectedImgs={images}
            handleImageSelection={handleImageSelection}
            closeModal={() => handleModalClose()}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

const blockRenderer = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === "atomic") {
    return {
      component: ImageBlock,
      editable: false,
    };
  }
  return null;
};

const ImageBlock = (props) => {
  const {block, contentState} = props;
  const {src} = contentState.getEntity(block.getEntityAt(0)).getData();

  return <img style={{maxWidth: "100%"}} src={src} alt="Inserted" />;
};

export default RichTextEditor;
