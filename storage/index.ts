import AsyncStorage from "@react-native-community/async-storage";

class Storage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

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
export default new Storage(DEFAULT_STORAGE);
