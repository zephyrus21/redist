import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link color='white' mr='2'>
            Login
          </Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='white' mr='2'>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr='4'>{data.me.username}</Box>
        <Button variant='link'>LogOut</Button>
      </Flex>
    );
  }

  return (
    <Flex bg='tomato' p='4'>
      <Box ml='auto'>{body}</Box>
    </Flex>
  );
};

export default NavBar;
