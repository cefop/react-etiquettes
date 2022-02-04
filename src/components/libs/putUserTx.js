// import fetch from "node-fetch";

// http://localhost:3000/?fingerprint=OTMlLUNsYXNzaWMtUlk0IC8gOCUtQ29jby1EcmVhbQ==&rid=6e83be54-1a6a-429d-9dba-71b9f572b831&shop=super%20shop&shopid=86cd165d-7143-4cdc-9693-324de4291bef

// export const hasuraRequest = (query, variables) => {
//   return fetch(process.env.HASURA_ENDPOINT as string, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });
// };
