import Entry from "@/models/entry";
import store from "@/store";
import { entriesService } from "@/services/entries";
import _ from 'lodash';

export class CategoriesService {

  public initializeCategories(): Promise<string[]> {
    return new Promise<string[]>((rslv => {
      this.categories = [];
      const newCategories: string[] = [];
      entriesService.entries.forEach((entry: Entry) => {
        if (entry.categories) {
          entry.categories.forEach((category: string) => {
            if (!newCategories.includes(category)) {
              newCategories.push(category);
            }
          });
        }
      });
      this.categories = newCategories;
      rslv(newCategories);
    }))
  }

  public addCategory(category: string): Promise<string> {
    if (!category) return Promise.reject();
    store.commit("addCategory", category);
    return Promise.resolve(category);
  }

  public mergeCategories(categories: string[]): Promise<string[]> {
    const promises: Promise<string>[] = [];
    categories.forEach((category: string) => {
      if (!this.categories.includes(category)) {
        promises.push(this.addCategory(category));
      }
    });
    return Promise.all(promises);
  }

  public deleteCategory(category: string): Promise<string> {
    if (!category) return Promise.resolve(category);
    store.commit("deleteCategory", category);
    return Promise.resolve(category);
  }

  public get categories(): string[] {
    return store.state.categories;
  }

  public set categories(categories: string[]) {
    store.commit("setCategories", categories)
  }
}

export const categoriesService: CategoriesService = new CategoriesService();
