import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN, LOCALSTORAGE_USERINFO, LOCALSTORAGE_ORDER } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const tokenVar = makeVar(token);
export const isLoggedInVar = makeVar(Boolean(token));
const userInfo = localStorage.getItem(LOCALSTORAGE_USERINFO);
const user = userInfo ? JSON.parse(userInfo) : '';
export const userInfoVar = makeVar(user);
const LocalOrder = localStorage.getItem(LOCALSTORAGE_ORDER);
const order = LocalOrder ? JSON.parse(LocalOrder) : '';
export const orderVar = makeVar(order);

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production'
    ? 'https://my-cafe-service.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": tokenVar() || "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return tokenVar();
            }
          },
          userInfo: {
            read() {
              return userInfoVar();
            }
          },
          order: {
            read() {
              return orderVar();
            }
          }
        },
      },
    },
  }),
});
