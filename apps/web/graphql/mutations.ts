import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      token
      user {
        firstName
        lastName
      }
    }
  }
`;
