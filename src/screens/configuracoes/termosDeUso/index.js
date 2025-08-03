import React from "react";
import TermsContent from "../../../components/termsContent";
import { Container, Content } from "./styles";

const TermosDeUso = () => {
  return (
    <Container>
      <Content>
        <TermsContent showFullContent={true} showDownloadButton={true} />
      </Content>
    </Container>
  );
};

export default TermosDeUso;
