import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      firstName
      lastName
      trackers {
        id
        selectors {
          values {
            timestamp
            value
          }
        }
        notificationMethods
        tags {
          name
          color
        }
        description
        name
        notifyAnyway
        pinned
        updateFrequency
        url
      }
    }
  }
`;
