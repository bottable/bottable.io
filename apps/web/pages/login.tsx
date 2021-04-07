import { LOGIN_MUTATION } from '../graphql/mutations';
import { setCookie } from '../utils';

import React from 'react';
import {
  Card,
  Heading,
  Text,
  Input,
  Button,
  Checkbox,
  notification,
} from 'fiber-ui';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik } from 'formik';

const Login = () => {
  const router = useRouter();

  const [login] = useMutation(LOGIN_MUTATION, {
    onError() {
      notification.open({
        message: 'Server Error',
        description:
          'There is a problem with the server currently. Please come back later.',
      });
    },
  });

  const initialValues = { email: '', password: '' };

  const validate = (values: { [key: string]: string }) => {
    const errors: { email?: string; password?: string } = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const onSubmit = async (data, { setSubmitting }) => {
    const loginResults = await login({
      variables: data,
    });

    if (loginResults) {
      const {
        data: {
          login: { token },
        },
      } = loginResults;

      setCookie(token);
      setSubmitting(false);
      router.push('/');
    }
  };

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.15)',
        color: '#000',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        padding: '34px 50px',
        height: 708,
      }}
      width={590}
    >
      <Heading size={1} style={{ margin: 0, marginBottom: 19 }}>
        Log In
      </Heading>
      <div style={{ marginBottom: 62 }}>
        <Text style={{ fontSize: 14 }}>
          Need a Bottable account?{' '}
          <Link href="/register">
            <a style={{ color: '#1e67dc', textDecoration: 'none' }}>
              Create an account
            </a>
          </Link>
        </Text>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Text>Email</Text>
            <Input
              style={{ width: '100%', marginBottom: 32 }}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <Text>Password</Text>
            <Input.Password
              style={{ width: '100%', marginBottom: 32 }}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginBottom: 26 }}
              disabled={isSubmitting}
            >
              Log In
            </Button>
            <div
              style={{
                marginBottom: 26,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Checkbox name="checked">Keep me logged in</Checkbox>
            </div>
          </form>
        )}
      </Formik>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text>
          <Link href="/login">
            <a style={{ color: '#1e67dc', marginRight: 21 }}>
              Forgot username?
            </a>
          </Link>
          •
          <Link href="/login">
            <a style={{ color: '#1e67dc', marginLeft: 21 }}>Forgot password?</a>
          </Link>
        </Text>
      </div>
    </Card>
  );
};

export default Login;
