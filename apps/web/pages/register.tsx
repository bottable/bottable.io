import React from 'react';
import { Card, Heading, Text, Input, Button } from 'fiber-ui';

const Register = () => {
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
          <a href="/login" style={{ color: '#1e67dc', textDecoration: 'none' }}>
            Log in
          </a>
        </Text>
      </div>
      <Text>First Name</Text>
      <Input style={{ width: '100%', marginBottom: 32 }} />
      <Text>Last Name</Text>
      <Input style={{ width: '100%', marginBottom: 32 }} />
      <Text>Email</Text>
      <Input style={{ width: '100%', marginBottom: 32 }} />
      <Text>Password</Text>
      <Input.Password style={{ width: '100%', marginBottom: 32 }} />
      <Button type="primary">Sign Up</Button>
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
