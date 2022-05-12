export default class LocalStorageUtils {
  static write = (key: string, value: any): void => {
    const stringValue: string = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  };

  static read = (key: string): any => {
    const itemValue: string | null = localStorage.getItem(key);
    if (!itemValue) {
      return null;
    }
    return JSON.parse(itemValue);
  };
}
