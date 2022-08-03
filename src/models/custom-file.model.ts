export default interface CustomFile {
  _id?: string;
  extension: string;
  size: number;
  type: string;
  base64: string;
  fileString?: any;
}
