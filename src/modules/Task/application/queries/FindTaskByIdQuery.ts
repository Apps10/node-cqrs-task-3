import { Query } from "../../../../shared/domain/Query";

export class FindTaskByIdQuery extends Query {
  constructor(
    commandId: string,
    public readonly taskId: string,
  ) {
    super(commandId);
  }
}
