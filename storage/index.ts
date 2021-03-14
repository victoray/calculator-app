import AsyncStorage from "@react-native-community/async-storage";

export interface Storage {
  key: string;

  setItem(value: unknown): unknown;

  getItem(): unknown;
}

export class BaseStorage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }
}

class LocalStorage extends BaseStorage implements Storage {
  async setItem(value: unknown): Promise<void> {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
    }
  }

  async getItem(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.key);
    } catch (error) {
      return null;
    }
  }
}

const DEFAULT_STORAGE = "calculatorHistory";
export default new LocalStorage(DEFAULT_STORAGE);
