import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
    }
  }
`;

export {GET_CLIENTS}