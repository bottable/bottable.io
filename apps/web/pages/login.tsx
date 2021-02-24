import React from 'react';
import { Card, Heading, Text, Input, Button, Checkbox } from 'fiber-ui';

const Login = () => {
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
          <a
            href="/register"
            style={{ color: '#1e67dc', textDecoration: 'none' }}
          >
            Create an account
          </a>
        </Text>
      </div>
      <Text>Email</Text>
      <Input style={{ width: '100%', marginBottom: 32 }} />
      <Text>Password</Text>
      <Input.Password style={{ width: '100%', marginBottom: 32 }} />
      <Button type="primary" block style={{ marginBottom: 26 }}>
        Log In
      </Button>
      <div
        style={{ marginBottom: 26, display: 'flex', justifyContent: 'center' }}
      >
        <Checkbox>Keep me logged in</Checkbox>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text>
          <a href="/" style={{ color: '#1e67dc', marginRight: 21 }}>
            Forgot username?
          </a>
          •
          <a href="/" style={{ color: '#1e67dc', marginLeft: 21 }}>
            Forgot password?
          </a>
        </Text>
      </div>
    </Card>
  );
};

export default Login;
