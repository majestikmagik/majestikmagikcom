// backend/db.js (ESM, no TS syntax)
import { Client } from "pg";
import { Connector, AuthTypes, IpAddressTypes } from "@google-cloud/cloud-sql-connector";

let clientPromise = null;

export function getPgClient() {
  if (clientPromise) return clientPromise;

  clientPromise = (async () => {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
      instanceConnectionName: process.env.CLOUDSQL_INSTANCE, // e.g. project:region:instance
      ipType: IpAddressTypes.PUBLIC,                         // or IpAddressTypes.PRIVATE if using VPC
      authType: AuthTypes.IAM,                               // uses IAM DB auth
    });

    const client = new Client({
      ...clientOpts,
      user: process.env.DB_IAM_USER, // e.g. <run-sa>@<project>.iam.gserviceaccount.com
      database: process.env.DB_NAME, // e.g. appdb
      // no password when using IAM auth
    });

    await client.connect();

    // close the connector when the process exits
    process.on("beforeExit", () => connector.close());
    return client;
  })();

  return clientPromise;
}
