export type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface FlarebaseClientOptions {
  global?: {
    fetch?: Fetch;
    headers?: Record<string, string>;
  };
  env?: 'dev' | 'stg' | 'prod' | '';
  localDev?: {
    databaseUrl?: string;
    storageUrl?: string;
  };
}

export interface GenericRelationship {
  constraintName: string;
  localColumns: string[];
  referencedTableName: string;
  referencedColumns: string[];
  isOneToOne?: boolean;
}

export interface GenericTable {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships?: GenericRelationship[];
}

export interface GenericDatabase {
  Tables: Record<string, GenericTable>;
}
