import React, {useEffect, useState} from 'react';
import './App.scss';
import {createGlobalStyle} from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ComposeContainer from "./containers/ComposeContainer";
import EditContainer from "./containers/EditContainer";
import HomeContainer from "./containers/HomeContainer";
import SummaryContainer from "./containers/SummaryContainer";

import {connect} from "react-redux"

const GlobalStyle = createGlobalStyle`
  a {
    color: ${props => props.theme.purple};
    font-weight: bold;
  }
`;

const routes = [
  {
    component: HomeContainer,
    path: "/",
    options: {exact: true},
  },
  {
    component: ComposeContainer,
    path: "/compose",
    options: {},
  },
  {
    component: EditContainer,
    path: "/edit",
    options: {},
  },
  {
    component: SummaryContainer,
    path: "/summary",
    options: {},
  },
  {
    component: HomeContainer,
    path: "*"
  }
];

const App = props => {
  const [fileLoaded, setFileLoaded] = useState(false);

  useEffect(() => {
    const ipc = window.require('electron').ipcRenderer;

    ipc.on("getProjectState", (event, data) => {
      event.sender.send("saveProjectState", props.state)
    });

    ipc.on('projectData', (event, data) => {
      console.log("file data received");

      //TODO: load file data into state
    });

    ipc.on('projectSaved', (event => {
      alert('file saved!')
    }));
  },[props]);

  return (
    <div className="App">
      <div>File Loaded: {fileLoaded}</div>
      <GlobalStyle/>
      <Router>
        <Switch>
          {routes.map((route, i) => {
            const Component = route.component;
            return (
              <Route path={route.path} {...route.options} key={i}>
                <Component/>
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps)(App);
