import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      firstName
      lastName
      trackers {
        id
        selectors {
          id
          values {
            timestamp
            value
          }
          alertTrigger {
            type
            payload
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
