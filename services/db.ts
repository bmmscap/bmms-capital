
const DB_NAME = 'IgniteProposalsDB';
const DB_VERSION = 1;
const STORE_NAME = 'userAssets';
const VIDEO_KEY = 'backgroundVideo';

let dbPromise: Promise<IDBDatabase>;

function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject('Error opening database.');
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }
  return dbPromise;
}

export async function saveVideo(videoBlob: Blob): Promise<void> {
  const db = await getDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.put(videoBlob, VIDEO_KEY);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => {
      console.error('Error saving video:', request.error);
      reject('Could not save video.');
    };
  });
}

export async function getVideo(): Promise<Blob | null> {
  const db = await getDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(VIDEO_KEY);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result instanceof Blob ? request.result : null);
    };
    request.onerror = () => {
      console.error('Error getting video:', request.error);
      reject('Could not retrieve video.');
    };
  });
}
