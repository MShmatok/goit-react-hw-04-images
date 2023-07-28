import { ThreeDots } from 'react-loader-spinner';
import React from 'react';
import { Container } from './Loader.styled';
const Loader = () => {
  return (
    <Container>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Container>
  );
};

export default Loader;
