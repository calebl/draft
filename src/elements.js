import styled, {css} from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const HeaderContainer = styled.div`
  height: 30px;
  width: 100%;
  text-align: center;
  
  display: flex;
  align-items: start;
  justify-content: space-between;
  
`;

export const Title = styled.h3`
  margin-top: 0;
  color: ${props => props.theme.gray};
  flex: 1;
  font-size: 14px;
  line-height: 30px;
`;

export const HeaderActions = styled.div`
  position: absolute;
  right: 0;

`;

export const HeaderActionStyles = css`
  color: ${props => props.theme.gray};
  border: 1px solid ${props => props.theme.gray};
  background: none;
  border-radius: ${props => props.theme.borderRadius};
  padding: 5px 10px;
  font-weight: bold;
  font-size: 12px;
  box-sizing: border-box;
  
  &:hover {
    color: ${props => props.theme.black};
    background: ${props => props.theme.lightgray};
  }
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