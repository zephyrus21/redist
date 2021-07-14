import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';

interface registerProps {}

const Login: React.FC<registerProps> = () => {
  const router = useRouter();
  const [_, login] = useLoginMutation();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='Username Or Email'
              label='Username Or Email'
            />
            <Box mt={4}>
              <InputField
                type='password'
                name='password'
                placeholder='password'
                label='password'
              />
            </Box>
            <Flex mt='4'>
              <NextLink href='/forgot-password'>
                <Link ml='auto'>Forgot Password?</Link>
              </NextLink>
            </Flex>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type='submit'
              colorScheme='teal'>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
