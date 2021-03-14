import { BaseStorage } from ".";
import * as firebase from "firebase";
import { firestore } from "firebase";

class Firestore extends BaseStorage {
  documentKey: string;

  constructor(key: string, documentKey: string) {
    super(key);

    this.documentKey = documentKey;
  }

  getItem(): Promise<firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    const app = firebase.app("CalculatorApp");

    return firestore(app)
      .collection(this.key)
      .orderBy("timestamp", "desc")
      .get();
  }

  setItem(value: Record<string, unknown>): Promise<unknown> {
    const app = firebase.app("CalculatorApp");

    return firestore(app).collection(this.key).add(value);
  }
}

export const DEFAULT_COLLECTION = "calculatorApplication";
export const HISTORY_DOCUMENT = "calculatorHistory";
export default new Firestore(DEFAULT_COLLECTION, HISTORY_DOCUMENT);
