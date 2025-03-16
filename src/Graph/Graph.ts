export class Graph<T> {
  private adjacencyList: Map<T, T[]>;
  private directed: boolean;

  constructor(directed: boolean = false) {
    this.adjacencyList = new Map<T, T[]>();
    this.directed = directed;
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(source: T, destination: T): void {
    if (!this.adjacencyList.has(source)) {
      this.addVertex(source);
    }

    if (!this.adjacencyList.has(destination)) {
      this.addVertex(destination);
    }

    this.adjacencyList.get(source)!.push(destination);

    if (!this.directed) {
      this.adjacencyList.get(destination)!.push(source);
    }
  }

  removeEdge(source: T, destination: T): void {
    if (this.adjacencyList.has(source)) {
      this.adjacencyList.set(
        source,
        this.adjacencyList.get(source)!.filter(v => v !== destination)
      );
    }

    if (!this.directed && this.adjacencyList.has(destination)) {
      this.adjacencyList.set(
        destination,
        this.adjacencyList.get(destination)!.filter(v => v !== source)
      );
    }
  }

  removeVertex(vertex: T): void {
    if (this.adjacencyList.has(vertex)) {
      this.adjacencyList.delete(vertex);
    }

    this.adjacencyList.forEach((neighbors, key) => {
      this.adjacencyList.set(
        key,
        neighbors.filter(v => v !== vertex)
      );
    });
  }

  getNeighbors(vertex: T): T[] {
    return this.adjacencyList.get(vertex) || [];
  }

  hasEdge(source: T, destination: T): boolean {
    const neighbors = this.adjacencyList.get(source);

    return neighbors ? neighbors.indexOf(destination) !== -1 : false;
  }

  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  getEdges(): [T, T][] {
    const edges: [T, T][] = [];
  
    this.adjacencyList.forEach((neighbors, vertex) => {
      neighbors.forEach(neighbor => {
        edges.push([vertex, neighbor]);
      });
    });

    return edges;
  }

  getAdjacencyList(): Map<T, T[]> {
    return this.adjacencyList;
  }

  getDirected(): boolean {
    return this.directed;
  }

  getSize(): number {
    return this.adjacencyList.size;
  }

  isEmpty(): boolean {
    return this.adjacencyList.size === 0;
  }

  printGraph(): void {
    this.adjacencyList.forEach((neighbors, vertex) => {
      console.log(vertex, "->", neighbors.join(", "));
    });
  }
}
