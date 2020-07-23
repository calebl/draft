import React, {useState} from "react";
import styled from "styled-components";
import {Parser} from "html-to-react";

const TextDiv = styled.div`
  padding: 5px;
  white-space: pre-wrap;
  pre {
    white-space: pre-wrap;
  }
`;

interface OverlayProps {
  show: boolean
}

const CopiedOverlay = styled.div`
  user-select: none;
  background: rgba(200,200,200, 0.8);
  opacity: ${(props: OverlayProps) => props.show ? '1' : '0'};
  z-index: ${(props: OverlayProps) => props.show ? '1' : '-1'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  
  h1 {
    color: rgba(0,0,0,0.6);
  }
`;

interface PropTypes {
  text: string
}

const TextView = ({text}: PropTypes) => {
  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
  const htmlParser = new Parser();
  const htmlText = text ?? '';
  const viewText = htmlParser.parse(htmlText);
  let textComponent: HTMLDivElement | null;

  const COPY_TEXT_OVERLAY_TIMEOUT = 2000;

  const copyToClipboard = () => {
    if (textComponent !== null) {
      let range = document.createRange();
      range.selectNode(textComponent);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();

      setShowCopiedOverlay(true);
      setTimeout(() => {
        setShowCopiedOverlay(false);
      }, COPY_TEXT_OVERLAY_TIMEOUT)
    }
  };


  return (
    <React.Fragment>
      <TextDiv data-cy={"text-content"} ref={(c) => textComponent = c} onClick={copyToClipboard}>{viewText}</TextDiv>
      <CopiedOverlay show={showCopiedOverlay}><h1>Copied!</h1></CopiedOverlay>
    </React.Fragment>
  )
};

export default TextView;