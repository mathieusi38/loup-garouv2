import React from "react";
import HeaderPage from "./Header.js";
import FooterPage from "./Footer.js";
import styled from "styled-components";

const Body = styled.section`
  width: 100%;

  article {
    background-color: #fff;
    padding: 20px;
  }
`;

const Layout = props => {
  return (
    <div>
      <HeaderPage> Loup-Garou </HeaderPage>
      <Body>
        <article>{props.children}</article>
      </Body>
      <FooterPage> Loup-Garou par Mathieu Siaud </FooterPage>
    </div>
  );
};

export default Layout;
