import auth from 'Services/auth';

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

  // TODO: Need investigation on how to make this better
  let responseBody;
  try {
    responseBody = await response.json();
  } catch (error) {
    responseBody = { errors: [{ message: response.statusText }] };
  }

  if (!responseBody.data && responseBody.errors) {
    throw new GraphQLError(responseBody.errors);
  }
  return responseBody.data;
}

export { GraphQLError };
