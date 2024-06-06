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

const AdminMenu = styled.div`
  margin-top: auto;
  width: 100%;
`;

const ManagerMenu = styled.div`
  margin-top: auto;
  width: 100%;
`;

function MainPage() {
  const userType = localStorage.getItem('userType');
  const userName = localStorage.getItem('userName');

  return (
    <MainPageContainer>
      <Navigation>
        <UserDisplayComponent userName={userName}/>
        <NavButton to="/main/reservations">금일 예약 고객</NavButton>
        {(userType === "manager" || userType === "admin") &&
          <ManagerMenu>
            {(userType === "admin") &&
              <AdminMenu>
                <NavButton to="/main/property-data">전체 매물 데이터</NavButton>
              </AdminMenu>
            }
            <NavButton to="/main/inquiries">광고 매체별 문의</NavButton>
            <NavButton to="/main/customer-data">전체 고객 데이터</NavButton>
            <NavButton to="/main/employee-management">직원 관리</NavButton>
          </ManagerMenu>
        }
      </Navigation>
      <Content>
        <Routes>
          <Route path="reservations" element={<Reservations />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="customer-data" element={<CustomerData />} />
          <Route path="property-data" element={<PropertyData />} />
          <Route path="employee-management" element={<EmployeeManagement />} />
        </Routes>
      </Content>
    </MainPageContainer>
  );
}

export default MainPage;