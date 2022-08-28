import Category from "./category.model";
import CustomFile from "./custom-file.model";

export default interface Project {
  id?: string;
  name: string;
  description?: string;
  shortDescription?: string;
  highlighted?: boolean;
  semester?: Semester;
  year?: string;
  categories?: any[] | Category[];
  mainImage?: CustomFile;
  extraImages?: CustomFile[];
}

export enum Semester {
  one = "1",
  two = "2",
}
