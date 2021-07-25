import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

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
      <Flex align='center' color='white'>
        <NextLink href='/create-post'>
          <Button mr={4}>Create Post</Button>
        </NextLink>
        <Box mr='4'>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          variant='link'>
          LogOut
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={100} position='sticky' top='0' bg='teal' p='4' align='center'>
      <Flex flex={1} align='center' maxW={800} margin='auto'>
        <NextLink href='/'>
          <Link>
            <Heading color='white'>Redist</Heading>
          </Link>
        </NextLink>
        <Box ml='auto'>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
