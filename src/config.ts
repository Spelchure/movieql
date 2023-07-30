export class Config {
  private readonly _kv: Record<string, any>;

  constructor(kv: Record<string, any>) {
    this._kv = kv;
  }

  public read<T>(key: string) {
    if (key === undefined || key.length === 0) {
      throw Error(`Invalid key: ${key}.`);
    }
    if (this._kv[key] === undefined || this._kv[key] === null) {
      throw Error(`You should define ${key} in the environment.`);
    }
    return this._kv[key] as T;
  }
}

const config = new Config(process.env);
export default config;
