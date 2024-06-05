import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ecffef;
`;

const SignUpBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const SignUpInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UserTypeSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SignUpButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #73D116;
  color: white;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");

  const callApi = async () => {
    try {
      const requestBody = { id, password, confirmPassword, name, userType };
      console.log('Sending request:', requestBody);

      const response = await axios.post("http://localhost:5000/join_process", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log('Response:', response.data);

      if (response.data.code === 202) {
        console.log(response.data);
        navigate('/');
      } else {
        console.log('Error:', response.data.reason);
      }
    } catch (error) {
      console.error('Error in API call:', error.response ? error.response.data : error.message);
    }
  };

  const handleSignUp = () => {
    callApi();
  };

  return (
    <SignUpContainer>
      <SignUpBox>
        <h1>등록</h1>
        <SignUpInput
          type="text"
          name="id"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <SignUpInput
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignUpInput
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SignUpInput
          type="text"
          name="name"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <UserTypeSelect
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="user">유저</option>
          <option value="midAdmin">중간 관리자</option>
          <option value="admin">관리자</option>
        </UserTypeSelect>
        <SignUpButton onClick={handleSignUp}>등록</SignUpButton>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUpPage;