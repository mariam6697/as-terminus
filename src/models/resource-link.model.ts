export default interface ResourceLink {
  _id?: string;
  title: string;
  description: string;
  url: number;
  public: boolean;
  type: string;
  project?: string;
}

export interface ResourceLinkList {
  page: number;
  limit: number;
  totalItems: number;
  resourceLinks: ResourceLink[];
}
