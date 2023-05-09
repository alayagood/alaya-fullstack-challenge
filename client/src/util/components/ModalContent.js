import React from "react";
import Card from "@material-ui/core/Card";
import "./ModalContent.css";

const ModalContent = React.forwardRef(({children, onModalClose}, ref) => (
  <Card ref={ref} className="modalContent">
    <span onClick={onModalClose}>
      <i class="bi bi-x-lg cursorPointer"></i>
    </span>
    {children}
  </Card>
));

export default ModalContent;
