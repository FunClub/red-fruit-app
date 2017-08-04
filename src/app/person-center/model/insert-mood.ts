import {Limit} from "./limit.enum";
/**
 * 插入心情模型
 */
export class InsertMood {
  content: string;
  imgs: string[];
  limit: number;

  constructor() {
    this.limit = Limit.PUBLIC;
  }
}
