import Trix from "trix";
import React, {useEffect} from "react";
import PropTypes from "prop-types"

const TextEditor = ({content, textChanged}) => {
  const trixInput = React.createRef();

  useEffect(() => {
    if (trixInput.current.editor && content === '') {
      trixInput.current.editor.loadHTML(content);
    }
  },[content]);

  useEffect(() => {
    const listener = event => {
      textChanged(event.target?.innerHTML);
    };

    trixInput.current.addEventListener("trix-change", listener);
  });

  return (
    <React.Fragment>
      <input type={"hidden"} id={"trix"} value={content}/>
      <trix-editor autofocus input="trix" ref={trixInput} data-testid={"compose-editor"}/>
    </React.Fragment>
  )
};

TextEditor.propTypes = {
  content: PropTypes.string,
  textChanged: PropTypes.func
};

export default TextEditor;