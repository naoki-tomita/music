import { Database as SQLite3DB } from "sqlite3";
import { named } from "automated-omusubi";

@named
export class Database {
  db: SQLite3DB;
  constructor() {
    this.db = new SQLite3DB("./data.db");
  }

  exec(sql: string) {
    sql = sql.replace("AUTO_INCREMENT", "AUTOINCREMENT");
    return new Promise<void>((ok, ng) => this.db.exec(sql, err => (err ? ng(err) : ok())));
  }

  get<T>(sql: string) {
    return new Promise<T | undefined>((ok, ng) => this.db.get(sql, (err, row) => (err ? ng(err) : ok(row))));
  }

  all<T>(sql: string) {
    return new Promise<T[]>((ok, ng) => this.db.all(sql, (err, rows) => (err ? ng(err): ok(rows))));
  }
}
