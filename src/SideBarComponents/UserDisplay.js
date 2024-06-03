import React from "react";
import styled from "styled-components";
import userImage from './user_image.png';

const UserDisplay = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    font-size: 18px;
    font-weight: bold;
`;

const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

function UserDisplayComponent({ userName }) {
    return (
        <UserDisplay>
            <UserImage src={userImage} alt="User" />
            {userName}
        </UserDisplay>
    );
}

export default UserDisplayComponent;