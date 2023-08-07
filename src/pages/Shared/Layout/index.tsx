import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import HeaderCmp from "@components/HeaderCmp/HeaderCmp";
import { LayoutContainer, Main } from "./styles";


const LayoutHome: React.FC = () => {

  const { pathname } = useLocation();
  return (
    <LayoutContainer>
      <HeaderCmp />
      <Main>
        <Outlet />
        <ScrollRestoration />
      </Main>
    </LayoutContainer>
  );
};

export default LayoutHome;
