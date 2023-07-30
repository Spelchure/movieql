import { Config } from "./config";

describe("Tests for config abstraction", () => {
  test("Should throw exception if key not found", () => {
    const config = new Config({});
    const key = "key";

    expect(config.read.bind(config, key)).toThrowError(
      `You should define ${key} in the environment.`
    );
  });
  test("Should throw exception if invalid key supplied", () => {
    const config = new Config({});
    const key = "";

    expect(config.read.bind(config, key)).toThrowError(`Invalid key: ${key}.`);
  });
  test("Should return value of the key", () => {
    const key = "myConfigKey";
    const value = "myConfigValue";

    const config = new Config({
      [key]: value,
    });

    const readedValue = config.read<string>(key);

    expect(readedValue).toBe(value);
  });
});
