// 考虑server实现无法确定，直接按照页面模块划分interface

export interface Info {
  layout: string;
  color: string;
  type: string;
  blocks: Blocks;
}

export interface Blocks {
  avatar?: string;
  first_name?: string;
  last_name?: string;
  pronouns?: string;
  location?: string;
  badges?: string[];
  about_me?: string;
  contact_me?: string;

  socials?: Social[];
}

export interface Badge {
  name: string;
  color: string;
  icon: string;
}

export interface Social {
  id: string;
  name: string;
  icon?: string;
  link?: string;
}
