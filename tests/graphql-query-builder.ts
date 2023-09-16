class GraphQLQueryBuilder {
  private readonly _name: string;
  private readonly _wants: string[];
  private readonly _data: Record<string, string | number | null>;
  private readonly _queryType: "mutation" | "query";

  protected constructor(name: string, queryType: "mutation" | "query") {
    this._name = name;
    this._wants = [];
    this._data = {};
    this._queryType = queryType;
  }

  wantsInResponse(...key: string[]) {
    this._wants.push(...key);
    return this;
  }

  addParameter(param: string, value: string | number | null) {
    this._data[param] = value;
    return this;
  }

  build() {
    if (this._queryType === "mutation" && this._isParametersEmpty()) {
      throw new Error(
        "invalid arguments: the data object is required in mutations"
      );
    }
    let query = `${this._queryType} ${this._name} { ${this._name}`;

    if (!this._isParametersEmpty()) {
      const params = Object.keys(this._data!).map((key) => {
        const value =
          typeof this._data[key] === "string"
            ? `"${this._data[key]}"`
            : this._data[key];
        return `${key}: ${value}`;
      });
      query += `(data: { ${params.join(", ")} })`;
    }
    query += ` { ${this._wants.join(", ")} } }`;
    return query;
  }

  private _isParametersEmpty() {
    return (
      this._data === undefined ||
      this._data === null ||
      Object.keys(this._data).length === 0
    );
  }
}

export class QueryGraphQLQueryBuilder extends GraphQLQueryBuilder {
  constructor(name: string) {
    super(name, "query");
  }
}

export class MutationGraphQLQueryBuilder extends GraphQLQueryBuilder {
  constructor(name: string) {
    super(name, "mutation");
  }
}
