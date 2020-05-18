import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  position: absolute;
  top: 10px;
  right: 10px;
  left: 10px;
  bottom: 10px;
`;

export const HeaderContainer = styled.div`
  height: 30px;
  width: 100%;
  text-align: left;
  
  display: flex;
  align-items: start;
  justify-content: space-between;
  
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  margin-top: 0;
  color: ${props => props.theme.purple}
`;

export const HeaderActionStyles = css`
  color: ${props => props.theme.purple};
  border: 1px solid ${props => props.theme.purple};
  background: none;
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px 10px;
  font-weight: bold;
`;

export const ButtonStyles = css`
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.purple};
  background: ${props => props.theme.purple};
  color: white;
  padding: 10px 20px;
  font-weight: bold;

  :active {
    background: white;
    color: ${props => props.theme.purple};
  }
  
  :focus {
    outline: none;
  }
`;