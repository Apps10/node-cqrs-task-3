import { Query } from "../../../../shared/domain/Query";

export class FindAllTaskQuery extends Query {
  constructor(
    commandId: string,
  ) {
    super(commandId);
  }
}
