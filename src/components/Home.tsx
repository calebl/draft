import React from "react";
import styled from "styled-components";
import DraftLogo from '../assets/LogoImage';
import {withRouter, Link, RouteComponentProps} from "react-router-dom";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: ${props => props.theme.white ?? 'white'};
  
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const StyledLink = styled(Link)`
  border: 2px solid ${props => props.theme.black};
  color: ${props => props.theme.black};
  font-weight: bold;
  
  border-radius: 5px;
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover, &:active {
    text-decoration: none;
    
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.lightgray};
  }
`;

const By = styled.small`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled(DraftLogo)`
  width: 160px;;
`;

interface PropTypes extends RouteComponentProps {
  text?: string,
  sessions: Session[]
}

const Home = ({text, sessions} : PropTypes) => {
  const actionText = (text !== '') ? 'Resume Session' : 'Start New Session';

  return (

    <HomeContainer>
      <div>
        <StyledLogo/>
        <By>by Curiosity & Conflict</By>
      </div>

      <div>
        <StyledLink to="/compose">{actionText}</StyledLink>
        {/*{`Total sessions: ${sessions.length}`}*/}
      </div>
    </HomeContainer>
  )
};

export default withRouter(Home);