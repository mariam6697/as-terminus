import Project from "@/models/project.model";
import { ResourceLinkList } from "@/models/resource-link.model";
import axios from "axios";

const seldonUrl = process.env.VUE_APP_SELDON_URL;

export default class SeldonService {
  static async getProjects(
    page: number,
    limit: number,
    query?: { highlighted: boolean }
  ): Promise<any> {
    let url = `${seldonUrl}/core/projects?page=${page}&limit=${limit}`;
    if (query && query.highlighted) {
      url += `&highlighted=${query.highlighted}`;
    }
    const response: any = await axios.get(url);
    return response.data.data;
  }

  static async getProjectById(id: string): Promise<Project> {
    const url = `${seldonUrl}/core/projects/${id}`;
    const response: any = await axios.get(url);
    response.data.data.id = response.data.data.nanoId;
    delete response.data.data.nanoId;
    const project: Project = { ...response.data.data };
    return project;
  }

  static async getProjectLinks(
    id: string,
    page: number,
    limit: number
  ): Promise<ResourceLinkList> {
    const url = `${seldonUrl}/core/resources-links/${id}?page=${page}&limit=${limit}`;
    const response: any = await axios.get(url);
    return {
      page: page,
      limit: limit,
      totalItems: response.data.data.totalItems,
      resourceLinks: response.data.data.resourceLinks,
    };
  }
}
