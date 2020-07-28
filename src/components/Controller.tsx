import React, {useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom";

const Controller = () => {
  let history = useHistory();

  useEffect(() => {
    if(window.require) {
      const ipc = window.require('electron').ipcRenderer;

      //receive getProjectState and reply with project state
      ipc.on("startSession", (event: any) => {
        // Go to /compose
        history.push("/compose");
      });

      ipc.on("viewSessionArchive", (event: any) => {
        history.push("/archive")
      });
    }
  });

  return <></>
};

export default withRouter(Controller);