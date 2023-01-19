export class SfNode {
  id!: string;
  description!: string;

  children: Array<SfNode>;

  constructor(id: string, description: string, children?: Array<SfNode>) {
    this.id = id;
    this.description = description;
    this.children = children ?? [];
  }
}
