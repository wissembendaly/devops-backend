/* eslint-disable @typescript-eslint/ban-types */
import { Exclude, Type } from "class-transformer";

export class ListResult<T> {
  @Exclude()
  private type: Function; // used by class transformer

  page: number; // current page number

  @Type((options) => {
    return (options.newObject as ListResult<T>).type;
  })
  results: T[]; // the results

  total_pages: number; // total number of pages

  @Exclude()
  total_results: number; // total number of results

  constructor(type: Function) {
    this.type = type;
  }
}
