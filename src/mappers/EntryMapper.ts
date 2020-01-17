import Entry from "@/models/entry";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default class EntryMapper {
  public static toEntry(o: firebase.firestore.DocumentSnapshot): Entry {
    const entry = new Entry();
    const data: any = o.data();

    entry.id = o.id;
    entry.title = data.title;
    entry.description = data.description;
    entry.categories = data.categories;

    return entry;
  }

  public static toDocument(o: Entry): Object {
    const document: any = Object.assign({}, o);

    delete document.id;
    document.title = document.title || '';
    document.description = document.description || '';
    document.categories = document.categories || [];  

    return document;
  }
}
