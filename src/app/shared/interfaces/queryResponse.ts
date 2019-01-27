import { IQueryResult } from "./queryResult";

export interface IQueryResponse<T> {
    total_rows: number;
    offset: number;
    rows: IQueryResult<T>[];
}