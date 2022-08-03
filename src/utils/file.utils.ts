import CustomFile from "@/models/custom-file.model";

export default class FileUtils {
  static fromBase64ToFile = (fileData: CustomFile): string => {
    const fileString = `data:${fileData.type};base64,${fileData.base64}`;
    return fileString;
  };
}
