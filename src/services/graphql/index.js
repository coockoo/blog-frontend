import auth from 'services/auth';

import GraphQLError from './GraphQLError';

export default async function graphQLRequest(query, variables) {
  const body = { query, variables };

  const headers = {
    'Content-Type': 'application/json',
  };
  const accessToken = auth.getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch('/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const responseBody = await response.json();
  if (!responseBody.data && responseBody.errors) {
    throw new GraphQLError(responseBody.errors);
  }
  return responseBody.data;
}
