import React from "react";
import { Quill } from "react-quill";

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "align",
  "list",
  "link"
];

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </span>
    <span className="ql-formats">
      <button className="ql-align" value=""></button>
      <button className="ql-align" value="center"></button>
      <button className="ql-align" value="right"></button>
      <button className="ql-align" value="justify"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
  </div>
);

export default QuillToolbar;