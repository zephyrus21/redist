import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [_, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='newPassword'
              placeholder='new password'
              label='New Password'
              type='password'
            />
            {tokenError ? <Box color='red'>{tokenError}</Box> : null}
            <Button
              mt={4}
              isLoading={isSubmitting}
              type='submit'
              colorScheme='teal'>
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return { token: query.token as string };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
