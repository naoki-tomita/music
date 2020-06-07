import { Database as SQLite3DB } from "sqlite3";
export declare class Database {
    db: SQLite3DB;
    constructor();
    exec(sql: string): Promise<void>;
    get<T>(sql: string): Promise<T | undefined>;
    all<T>(sql: string): Promise<T[]>;
}
//# sourceMappingURL=SQLite.d.ts.map