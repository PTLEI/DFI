// 考虑server实现无法确定，直接按照页面模块划分interface

export interface Info {
  layout: string;
  color: string;
  type: string;
  blocks: Blocks;
}

export interface Blocks {
  first_name?: string;
  last_name?: string;
  pronouns?: string;
  location?: string;
}
