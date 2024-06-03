import axios from "axios";
import React, { useState } from 'react';
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

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const callApi = async () => {
    try {
      const requestBody = {id, password};
      const response = await axios.post("http://localhost:5000/login_process",  requestBody , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
     
     if(response.data.code === 202) {
      console.log(response.data);
      navigate('/main'); }
      else console.log(response.data.reason)

    } catch (error) {
      console.error('Error in API call:', error);
    }

  };
  const handleLogin = () => {
    callApi();
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
        <LoginInput 
          type="text"
          name="id" 
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID..." />
        <LoginInput 
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..." />
        <ButtonContainer>
          <RegisterButton onClick={handleSignUp}>Register</RegisterButton>
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </ButtonContainer>
      </LoginBox>
    </LoginContainer>
  );
}

export default LoginPage;