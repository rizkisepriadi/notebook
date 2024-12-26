const DB_NAME = "ToDoDatabase";
const DB_VERSION = 6; // Versi diperbarui untuk perubahan struktur
let db;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Tabel tasks
      if (!db.objectStoreNames.contains("tasks")) {
        const taskStore = db.createObjectStore("tasks", {
          keyPath: "id",
          autoIncrement: true,
        });
        taskStore.createIndex("category", "category", { unique: false });
        taskStore.createIndex("type", "type", { unique: false });
        taskStore.createIndex("startDate", "startDate", { unique: false });
        taskStore.createIndex("endDate", "endDate", { unique: false });
      } else {
        const taskStore = event.target.transaction.objectStore("tasks");
        if (!taskStore.indexNames.contains("startDate")) {
          taskStore.createIndex("startDate", "startDate", { unique: false });
        }
        if (!taskStore.indexNames.contains("endDate")) {
          taskStore.createIndex("endDate", "endDate", { unique: false });
        }
      }

      // Tabel categories
      if (!db.objectStoreNames.contains("categories")) {
        const categoryStore = db.createObjectStore("categories", {
          keyPath: "id",
          autoIncrement: true,
        });
        categoryStore.createIndex("name", "name", { unique: true });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Task Management
export const addTask = (task) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.add(task);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const updateTask = (id, updatedTask) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");

    // Ambil task yang ada terlebih dahulu
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const existingTask = event.target.result;
      if (!existingTask) {
        reject(new Error("Task not found"));
        return;
      }

      // Update task dengan data baru
      const updatedData = { ...existingTask, ...updatedTask };
      const putRequest = store.put(updatedData);

      putRequest.onsuccess = () => {
        resolve();
      };

      putRequest.onerror = (event) => {
        reject(event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const fetchTasks = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["tasks"], "readonly");
    const store = transaction.objectStore("tasks");
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Category Management
export const addCategory = (category) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["categories"], "readwrite");
    const store = transaction.objectStore("categories");
    const request = store.add(category);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["categories"], "readwrite");
    const store = transaction.objectStore("categories");
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["categories"], "readonly");
    const store = transaction.objectStore("categories");
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
