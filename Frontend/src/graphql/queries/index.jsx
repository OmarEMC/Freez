import {
  gql
} from '@apollo/client';

export const getUser = gql`
  query getUserQuery {
    getUser {
      api {
        key
      }
      requests {
        last {
          to
          date
        }
        corazon
        fallar
        screenshot
        internet
        obradearte
        turner_web
        triturar
      }
      id
      tag
      avatar
      logged
    }
  }
`;

export const LoggedStatus = gql`
  query LoggedStatusQuery {
    getUser {
      logged
    }
  }
`;