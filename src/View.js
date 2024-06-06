import React from 'react';
import styled from 'styled-components';
import {Route, Routes, NavLink } from 'react-router-dom';

import Reservations from './MainPageComponents/Reservations';
import Inquiries from './MainPageComponents/Inquiries';
import CustomerData from './MainPageComponents/CustomerData';
import PropertyData from './MainPageComponents/PropertyData';
import EmployeeManagement from './MainPageComponents/EmployeeManagerment';
import UserDisplayComponent from './SideBarComponents/UserDisplay';

const MainPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

//dcfdba
const Navigation = styled.div`
  width: 200px;
  background-color: #ffffff;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: #ecffef;
  padding: 5px;
`;

const NavButton = styled(NavLink)`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background-color: #ffffff;
  text-decoration: none;
  color: black;
  border: none;
  display: block;

  &:hover, &.active {
    background-color: #73D116;
    color: white;
  }
`;

function View() {
  const userName = "UserName";

  return (
    <MainPageContainer>
      <Navigation>
        <UserDisplayComponent userName={userName}/>
        <NavButton to="/view/reservations">금일 예약 고객</NavButton>
      </Navigation>
      <Content>
        <Routes>
          <Route path="reservations" element={<Reservations />} />
        </Routes>
      </Content>
    </MainPageContainer>
  );
}

export default View;