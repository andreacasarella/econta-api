export interface IMsqlError {
    code: MsqlErrorCode;
    errno: number;
    sqlMessage: string;
    sqlState: number;
    index: number;
    sql: string;
}

export enum MsqlErrorCode {
    ER_PARSE_ERROR = "ER_PARSE_ERROR",
    ER_BAD_FIELD_ERROR = "ER_BAD_FIELD_ERROR",
    PROTOCOL_ENQUEUE_AFTER_QUIT = "PROTOCOL_ENQUEUE_AFTER_QUIT",
    PROTOCOL_CONNECTION_LOST = "PROTOCOL_CONNECTION_LOST",
}
