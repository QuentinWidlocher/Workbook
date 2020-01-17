export default class Entry {
  id?: string;
  title!: string;
  description!: string;
  categories!: string[];

  public static newEmpty(): Entry {
    const entry: Entry = new Entry();
    entry.title = "";
    entry.description = "";
    entry.categories = [];
    return entry;
  }
}
