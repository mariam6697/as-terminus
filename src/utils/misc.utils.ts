export default class MiscUtils {
  static getYearAndSemester = (year: string, semester: string): string => {
    if (year && semester) {
      return `Semestre ${semester} ${year}`;
    }
    return "";
  };
}
