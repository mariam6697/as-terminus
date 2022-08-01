import axios from "axios";

const seldonUrl = process.env.VUE_APP_SELDON_URL;

export default class SeldonService {
  static async getProjects(page: number, limit: number) {
    const url = `${seldonUrl}/core/projects?page=${page}&limit=${limit}`;
    const response: any = await axios.get(url);
    return response.data.data;
  }
}
