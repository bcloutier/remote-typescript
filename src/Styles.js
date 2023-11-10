import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'EB Garamond', sans-serif;
  }
`;

export const Nav = styled.nav`
  background: #fefefe;

  ul {
    display: flex;
    list-style: none;
    margin: 0px;
    padding: 20px;

    li {
      padding: 0px 20px;
      font-size: 30px;
    }

    a {
      text-decoration: none;
    }
  }
`;

export const Content = styled.div`
  margin: 0px 100px;
  padding: 40px 0px;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px dotted #888;
  font-size: 20px;
  padding: 10px;
  margin: 20px 0px;
`;

export const Button = styled.button`
  margin-top: 60px;
  background-color: ${props => (props.disabled ? '#444' : '#023e8a')};
  color: white;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: ${props => (props.disabled ? '#444' : '#134f9b')};
  }
`;

export const Alert = styled.div`
  background-color: #eee;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
`;
