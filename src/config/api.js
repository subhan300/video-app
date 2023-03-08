import axios from "axios";
export const API = axios.create({
  // baseURL: "https://2gp5qe2y2fbtth2untr5rreaae.appsync-api.us-east-1.amazonaws.com/graphql",
  // baseURL:"https://ufdxqfg5mvebloysxhs3qevr3a.appsync-api.ap-south-1.amazonaws.com/graphql"
  baseURL:
    "https://574mnbqwxbhblatgwdjxvtu72q.appsync-api.ap-south-1.amazonaws.com/graphql",
});

export const Headers = (token) => {
  //   API.defaults.headers.post["Content-Type"] = "application/json";
  //   API.defaults.headers.post["token"] = localStorage.getItem("token");
  //   API.defaults.headers.get["token"] = localStorage.getItem("token");
  return token
    ? {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "da2-kcyi2io3gncqvm533gfkrpijme",
      }
    : {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "da2-kcyi2io3gncqvm533gfkrpijme",
      };
};
