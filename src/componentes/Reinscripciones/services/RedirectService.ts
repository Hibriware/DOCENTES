import { ServerResponse } from "http";
//import Router from "next/router";
let Router = null;
export const redirectToLogin = (server?: ServerResponse) => {
  const login = "/login";
  if (server) {
    server.writeHead(302, {
      Location: login,
    });
    server.end();
  } else {
    Router.push(login);
  }
};