import { IQueryResult } from "./queryResult";

export interface IQueryResults<T> {
    total_rows: number;
    offset: number;
    rows: IQueryResult<T>[];
}