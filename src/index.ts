import FlarebaseClient from "./FlarebaseClient";
import type { FlarebaseClientOptions, GenericDatabase } from "./lib/types";

export { default as FlarebaseClient } from "./FlarebaseClient";

/**
 * Creates a new Flarebase client instance.
 */
export const createClient = <
    Database extends GenericDatabase = GenericDatabase
>(
    pid: string,
    databaseName: string,
    apiKey: string,
    isLocalDev?: boolean,
    options?: FlarebaseClientOptions,
): FlarebaseClient<Database> => {
    return new FlarebaseClient<Database>(pid, databaseName, apiKey, isLocalDev, options);
}