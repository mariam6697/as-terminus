import Project from "@/models/project.model";
import Repository from "@/models/repository.model";
import { ResourceLinkList } from "@/models/resource-link.model";
import axios from "axios";

const seldonUrl = process.env.VUE_APP_SELDON_URL;

export default class SeldonService {
  static async getCategories(): Promise<any> {
    const url = `${seldonUrl}/core/categories`;
    const response: any = await axios.get(url);
    return response.data.data;
  }

  static async getCategory(catLabel: string): Promise<any> {
    const url = `${seldonUrl}/core/categories/label/${catLabel}`;
    const response: any = await axios.get(url);
    return response.data.data;
  }

  static async getProjects(
    page: number,
    limit: number,
    query?: {
      highlighted?: boolean;
      categories?: string[];
      semester?: number;
      year?: number;
    }
  ): Promise<any> {
    let url = `${seldonUrl}/core/projects?page=${page}&limit=${limit}`;
    if (query) {
      if (query.highlighted) {
        url += `&highlighted=${query.highlighted}`;
      }
      if (query.categories && query.categories.length > 0) {
        url += `&cat=${
          query.categories.length == 1
            ? query.categories[0]
            : query.categories.join(",")
        }`;
      }
      if (query.semester) {
        url += `&semester=${query.semester}`;
      }
      if (query.year) {
        url += `&year=${query.year}`;
      }
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

  static async getRepositories(id: string): Promise<Repository[]> {
    const url = `${seldonUrl}/core/repositories/project/${id}`;
    const response: any = await axios.get(url);
    return response.data.data;
  }
}
