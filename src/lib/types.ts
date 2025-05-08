export type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export type FlarebaseClientOptions = {
    global?: {
        fetch?: Fetch
        headers?: Record<string, string>
    },
    localDev?: {
        databaseUrl?: string
        storageUrl?: string
    }
}

export type GenericRelationship = {
    constraintName: string
    localColumns: string[]
    referencedTableName: string
    referencedColumns: string[]
    isOneToOne?: boolean
}

export type GenericTable = {
    Row: Record<string, unknown>
    Insert: Record<string, unknown>
    Update: Record<string, unknown>
    Relationships?: GenericRelationship[]
}

export type GenericDatabase = {
    Tables: Record<string, GenericTable>
}
