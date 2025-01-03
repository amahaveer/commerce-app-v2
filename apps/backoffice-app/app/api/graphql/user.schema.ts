import { gql } from '@apollo/client';

export const MY_PROFILE_QUERY = gql`
    query GetUserProfile {
        getUserProfile {
            email
            firstName
            lastName
        }
    }
`

export const LOGIN_QUERY = gql`
    mutation LoginUser($body: ILogin!) {
        loginUser(body: $body) {
            accessToken
        }
    }
`