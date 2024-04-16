export class Vocabulary {
  public name: string;
  public description: string;
  public data: Array<Node>;

  constructor(name: string, description: string, data: Array<Node> = []) {
    this.name = name;
    this.description = description;
    this.data = data;
  }
}

class Node {
  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public key: string;
  public value: string;
}
