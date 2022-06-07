const gql = (a: TemplateStringsArray) => a[0];

export const LoginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: {identifier: $email, password: $password}) {
      jwt
    }
  }
`;

export const RegisterQuery = gql`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register (input: {email: $email, password: $password, username: $username}) {
      jwt
    }
  }
`;
