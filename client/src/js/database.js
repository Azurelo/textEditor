import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  //Done
//accepts then adds content
  export const putDb = async (content) => {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    tx.objectStore('jate').add(content);
    await tx.done;
  }
  //Done
  //gets all the content from the database
  export const getDb = async () => {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const content = await tx.store.getAll();
    await tx.done;
    return content;
  }
initdb();
