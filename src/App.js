import React from 'react';
import './App.scss';
import styled, {createGlobalStyle} from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {loadSession} from "./actions/session";
import {loadSessions} from "./actions/sessions";

import ComposeContainer from "./containers/ComposeContainer";
import EditContainer from "./containers/EditContainer";
import HomeContainer from "./containers/HomeContainer";
import SummaryContainer from "./containers/SummaryContainer";

import Controller from "./components/Controller";

import {connect} from "react-redux"
import SessionsContainer from "./containers/SessionsContainer";

const GlobalStyle = createGlobalStyle`
  a {
    color: ${props => props.theme.purple};
    font-weight: bold;
  }
`;

const TitleBar = styled.div`
  height: 25px;
  width: 100%;
  -webkit-app-region: drag;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
    component: SessionsContainer,
    path: "/archive",
    options: {}
  },
  {
    component: HomeContainer,
    path: "*"
  }
];

const App = props => {

  return (
    <div className="App">
      <GlobalStyle/>
      <TitleBar/>
      <ContentContainer>
        <Router>
          <Controller/>
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
      </ContentContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  loadSession: text => dispatch(loadSession(text)),
  loadSessions: sessions => dispatch(loadSessions(sessions))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
