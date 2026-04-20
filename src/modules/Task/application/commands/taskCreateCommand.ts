import { Command } from "../../../../shared/domain/Command";

export class TaskCreateCommand extends Command {
  constructor(
    commandId: string,
    public readonly taskId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean,
  ) {
    super(commandId);
  }
}
