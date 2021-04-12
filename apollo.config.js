module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"], // src 있는 모든폴더(/**)의 모든tsx파일(/*.tsx)
    tagName: "gql",
    service: {
      name: "my-cafe",
      url: "http://localhost:4000/graphql",
    },
  },
};