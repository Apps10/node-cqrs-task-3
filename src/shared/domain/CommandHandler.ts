import { Command } from "./Command";

export interface CommandHandler<TCommand extends Command> {
  handler(command: TCommand): Promise<void>
}