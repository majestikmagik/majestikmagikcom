// ./db.ts
import { Client } from "pg";
import { Connector, AuthTypes, IpAddressTypes } from "@google-cloud/cloud-sql-connector";

let clientPromise: Promise<Client> | null = null;

export function getPgClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const connector = new Connector();
      // Uses IAM DB Auth if DB_IAM_USER is set and password omitted
      const clientOpts = await connector.getOptions({
        instanceConnectionName: process.env.CLOUDSQL_INSTANCE!, // e.g. project:region:instance
        ipType: IpAddressTypes.PUBLIC, // or "PRIVATE" if VPC
        authType: AuthTypes.IAM
      });

      const client = new Client({
        ...clientOpts,
        user: process.env.DB_IAM_USER,                // e.g. my-sa@project.iam
        database: process.env.DB_NAME,                // e.g. appdb
        // no password when using IAM auth
      });

      await client.connect();
      return client;
    })();
  }
  return clientPromise;
}
