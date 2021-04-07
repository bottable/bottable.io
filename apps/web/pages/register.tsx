import { REGISTER_MUTATION } from '../graphql/mutations';
import { setCookie } from '../utils';

import React from 'react';
import { Card, Heading, Text, Input, Button, notification } from 'fiber-ui';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik } from 'formik';

const Register = () => {
  const router = useRouter();

  const [register] = useMutation(REGISTER_MUTATION, {
    onError() {
      notification.open({
        message: 'Server Error',
        description:
          'There is a problem with the server currently. Please come back later.',
      });
    },
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validate = (values: { [key: string]: string }) => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
    } = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }

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
    const registerResult = await register({
      variables: data,
    });

    if (registerResult) {
      const {
        data: {
          register: { token },
        },
      } = registerResult;

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
        Welcome to Bottable
      </Heading>
      <div style={{ marginBottom: 62 }}>
        <Text style={{ fontSize: 14 }}>
          Track everything with ease. Already have an account?{' '}
          <Link href="/login">
            <a style={{ color: '#1e67dc', textDecoration: 'none' }}>Log in</a>
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
            <Text>First Name</Text>
            <Input
              style={{ width: '100%', marginBottom: 32 }}
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <Text>Last Name</Text>
            <Input
              style={{ width: '100%', marginBottom: 32 }}
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
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
            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              Sign Up
            </Button>
          </form>
        )}
      </Formik>
      <div style={{ marginTop: 32 }}>
        <Text style={{ fontSize: 12, fontWeight: 300 }}>
          By clicking the "Sign Up" button, you are creating a Bottable account,
          and you agree to Bottable’s Terms of Use and Privacy Policy.
        </Text>
      </div>
    </Card>
  );
};

export default Register;
