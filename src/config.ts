export class Config {
  private readonly _kv: object;

  constructor(kv: object) {
    this._kv = kv;
  }

  public read<T>(key: string) {
    if (process.env["key"] === undefined) {
    }
  }
}
