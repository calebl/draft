// eslint-disable-next-line no-unused-vars
import Trix from "trix";
import React, {useEffect} from "react";
import PropTypes from "prop-types"

const TextEditor = ({content, textChanged}) => {
  const trixInput = React.createRef();

  useEffect(() => {
    if (trixInput.current.editor && content === '') {
      trixInput.current.editor.loadHTML(content);
    }
  },[trixInput,content]);

  useEffect(() => {
    const listener = event => {
      textChanged(event.target?.innerHTML);
    };

    trixInput.current.addEventListener("trix-change", listener);
  });

  return (
    <React.Fragment>
      <input type={"hidden"} id={"trix"} value={content}/>
      <trix-editor data-cy="text-editor" autofocus input="trix" ref={trixInput} data-testid={"compose-editor"}/>
    </React.Fragment>
  )
};

TextEditor.propTypes = {
  content: PropTypes.string,
  textChanged: PropTypes.func
};

export default TextEditor;