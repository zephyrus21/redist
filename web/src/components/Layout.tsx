import React from 'react';
import NavBar from './NavBar';
import Wrapper from './Wrapper';

interface LayoutProps {
  variant?: 'small' | 'regular';
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
