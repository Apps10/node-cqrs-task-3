
import { Client } from "@elastic/elasticsearch";
import { SearchRepository } from "../domain/SearchRepository";

export class ElasticSearchRepository implements SearchRepository {
  constructor(private readonly client: Client) {}

  async index(task: any): Promise<void> {
     await this.client.index({
      index: "tasks",
      id: task.id,
      document: task
    });
  }

  async update(id: string, data: any): Promise<void> {
    await this.client.update({
      index: "tasks",
      id,
      doc: data
    });
  }
}