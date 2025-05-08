import { fetchWithAuth } from "./lib/fetch";
import { applySettingDefaults } from "./lib/helper";
import type { Fetch, FlarebaseClientOptions, GenericDatabase } from "./lib/types";
import { DatabaseClient } from "@flarebase/database-js";
import { StorageClient } from "@flarebase/storage-js";

/**
 * Flarebase Client
 */
export default class FlarebaseClient<
    Database extends GenericDatabase = GenericDatabase,
> {
    protected databaseUrl: string;
    protected storageUrl: string;
    protected fetch?: Fetch;
    protected headers?: Record<string, string>;

    constructor(
        protected pid: string,
        protected databaseName: string,
        protected apiKey: string,
        protected isLocalDev?: boolean,
        options?: FlarebaseClientOptions,
    ) {
        if (isLocalDev) {
            if (!options?.localDev?.databaseUrl) throw new Error("databaseUrl is required");
            if (!options.localDev?.storageUrl) throw new Error("storageUrl is required");

            this.databaseUrl = `${options.localDev?.databaseUrl}/${databaseName}`;
            this.storageUrl = options.localDev?.storageUrl
        } else {
            if (!pid) throw new Error("pid is required");
            if (!databaseName) throw new Error("databaseName is required");
            if (!apiKey) throw new Error("apiKey is required");

            const baseUrl = `https://${pid}.flarebase.com/v1`;

            this.databaseUrl = `${baseUrl}/database/${databaseName}`;
            this.storageUrl = `${baseUrl}/storage`;
        }

        const settings = applySettingDefaults(options || {})

        this.fetch = fetchWithAuth(apiKey, settings.global?.fetch)
    }

    get database(): DatabaseClient {
        return new DatabaseClient<Database>(this.databaseUrl, {
            headers: this.headers,
            fetch: this.fetch,
        });
    }

    get storage(): StorageClient {
        return new StorageClient(this.storageUrl, {
            headers: this.headers,
            customFetch: this.fetch,
        });
    }
}
