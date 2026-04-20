import { Query } from "./Query";

export interface QueryHandler<TQuery extends Query, TResponse> {
  handler(query: TQuery): Promise<TResponse>
}