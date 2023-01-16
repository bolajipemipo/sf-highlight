export class SfNode {
  id!: string;
  description!: string;

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
  }
}
