import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/main');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;