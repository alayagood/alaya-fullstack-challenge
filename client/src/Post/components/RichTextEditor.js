import React, {useState, useRef} from "react";
import ImageList from "./ImageList";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ModalContent from "../../util/components/ModalContent";
import {stateToHTML} from "draft-js-export-html";
import "./RichTextEditor.css";

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
      <div className="buttons">
        <Button onClick={() => handleToolbarButtonClick("BOLD")}>
          <i className="bi bi-type-bold"></i>
        </Button>
        <Button onClick={() => handleToolbarButtonClick("ITALIC")}>
          <i className="bi bi-type-italic"></i>
        </Button>
        <Button onClick={() => handleToolbarButtonClick("UNDERLINE")}>
          <i className="bi bi-type-underline"></i>
        </Button>
        {!!images.length && (
          <Button onClick={handleCustomButtonClick}>
            <i className="bi bi-file-image"></i>
          </Button>
        )}
      </div>
      <div className="editorArea">
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
