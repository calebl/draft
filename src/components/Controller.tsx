import React, {useEffect} from "react";
import {withRouter, useHistory} from "react-router-dom";

const Controller = () => {
  let history = useHistory();

  useEffect(() => {
    const ipc = window.require('electron').ipcRenderer;

    //receive getProjectState and reply with project state
    ipc.on("startSession", (event : any) => {
      // Go to /compose
      history.push("/compose");
    });

    ipc.on("viewSessionArchive", (event : any) => {
      history.push("/archive")
    });

    ipc.on('projectData', (event : any, data : any) => {
      console.log("file data received");

      try {
        // const loadedState = JSON.parse(data);
        // props.loadSession(loadedState.session.text);
        // props.loadSessions(loadedState.sessions.sessions);

      } catch {
        alert("error loading project")
      }

      //TODO: load file data into state
    });
  },[]);

  return <></>
};

export default withRouter(Controller);