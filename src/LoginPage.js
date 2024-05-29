import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from './logo_with_name.png';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ecffef;
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const RegisterButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  width: 45%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color:#cccccc;
  color: white;
`;

const LoginButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  width: 45%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #73D116;
  color: white;
`;

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/main');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <LoginContainer>
      <Logo>
        <img src={logoImage} alt="Realtyview Logo" style={{ width: '300px' }} />
      </Logo>
      <LoginBox>
        <LoginInput type="text" placeholder="ID..." />
        <LoginInput type="password" placeholder="Password..." />
        <ButtonContainer>
          <RegisterButton onClick={handleSignUp}>Register</RegisterButton>
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </ButtonContainer>
      </LoginBox>
    </LoginContainer>
  );
}

export default LoginPage;