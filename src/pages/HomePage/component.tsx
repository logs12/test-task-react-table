import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import routes from "@/routes";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default () => {
  return (
    <Container>
      <Link to={routes.table}>Go to table</Link>
    </Container>
  );
};
