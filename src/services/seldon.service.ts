import axios from "axios";

const seldonUrl = process.env.VUE_APP_SELDON_URL;

export default class SeldonService {
  static async getProjects(
    page: number,
    limit: number,
    query?: { highlighted: boolean }
  ) {
    let url = `${seldonUrl}/core/projects?page=${page}&limit=${limit}`;
    if (query && query.highlighted) {
      url += `&highlighted=${query.highlighted}`;
    }
    const response: any = await axios.get(url);
    return response.data.data;
  }
}
