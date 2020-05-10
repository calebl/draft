import React, {useState, useEffect} from "react";
import Trix from "trix";

const Compose = props => {
  const trixInput = React.createRef();

  useEffect(() => {
    trixInput.current.addEventListener("trix-change", event => {
      console.log("trix change event fired");
      props.onChange(event.target.innerHTML); //calling custom event
    });
  });

  return (
    <div>
      <input type={"hidden"} id={"trix"} value={props.value}/>
      <trix-editor input="trix" ref={trixInput} />

    </div>
  )
};

export default Compose;