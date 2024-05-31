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

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    // 회원가입 로직을 여기에 추가
    console.log(form);
    navigate('/');
  };

  return (
    <SignUpContainer>
      <SignUpBox>
        <h1>등록</h1>
        <SignUpInput
          type="text"
          name="id"
          placeholder="아이디"
          value={form.id}
          onChange={handleChange}
        />
        <SignUpInput
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
        />
        <SignUpInput
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <SignUpInput
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
        />
        <UserTypeSelect
          name="userType"
          value={form.userType}
          onChange={handleChange}
        >
          <option value="">유저 유형</option>
          <option value="admin">관리자</option>
          <option value="user">유저</option>
        </UserTypeSelect>
        <SignUpButton onClick={handleSignUp}>등록</SignUpButton>
      </SignUpBox>
    </SignUpContainer>
  );
}

export default SignUpPage;
