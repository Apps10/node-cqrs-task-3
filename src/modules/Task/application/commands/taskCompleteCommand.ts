import { Command } from "../../../../shared/domain/Command";

export class TaskCompleteCommand extends Command {
  constructor(
    commandId: string,
    public readonly taskId: string,
  ) {
    super(commandId);
  }
}
