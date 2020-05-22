import React, {useEffect} from 'react';
import './App.scss';
import {createGlobalStyle} from "styled-components";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ComposeContainer from "./containers/ComposeContainer";
import EditContainer from "./containers/EditContainer";
import HomeContainer from "./containers/HomeContainer";
import SummaryContainer from "./containers/SummaryContainer";

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

const App = () => {
  useEffect(()=>{

  },[]);

  return (
    <div className="App">
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
}

export default App;
