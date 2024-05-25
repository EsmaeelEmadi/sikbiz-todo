// TYPES
import { TaskStatus, type ITask } from "../types/task";

const STORAGE_PATH = "sikbiz-tasks";
class TodoMockService {
  // enforce as it will be filled inside the read method
  private data!: Map<number, ITask>;
  private lastId: number = 0;

  constructor() {
    this.read();
  }

  private store() {
    localStorage.setItem(
      STORAGE_PATH,
      JSON.stringify(Array.from(this.data.values())),
    );
  }

  private read() {
    const cache = localStorage.getItem(STORAGE_PATH);
    if (cache) {
      const newMap = new Map(
        (JSON.parse(cache) as ITask[]).map((task) => {
          if (task.id > this.lastId) {
            this.lastId = task.id;
          }
          return [task.id, task];
        }),
      );

      this.data = newMap;
    } else {
      this.data = new Map();
      // create one sample data if cache is empty
      this.data.set(++this.lastId, {
        id: this.lastId,
        title: "first task",
        status: TaskStatus.TODO,
        description: "some description",
      });
      this.store();
    }
  }

  public async post(task: Omit<ITask, "id">): Promise<ITask> {
    return new Promise<ITask>((resolve) => {
      setTimeout(() => {
        this.lastId += 1;
        const newTask = { ...task, id: this.lastId };
        this.data.set(this.lastId, newTask);
        this.store();
        resolve(newTask);
      }, 500);
    });
  }

  public async update(task: ITask): Promise<ITask> {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const taskToUpdate = this.data.has(task.id);
        if (!taskToUpdate) {
          reject(new Error(`no task with this ${task.id} exists`));
        } else {
          this.data.set(task.id, task);
          this.store();
          resolve(task);
        }
      }, 500);
    });
  }

  public async remove(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const taskToUpdate = this.data.has(id);
        if (!taskToUpdate) {
          reject(new Error(`no task with this ${id} exists`));
        } else {
          this.data.delete(id);
          this.store();
          resolve();
        }
      }, 500);
    });
  }

  public async get(): Promise<ITask[]> {
    return new Promise<ITask[]>((resolve) => {
      setTimeout(() => {
        const arrayFromData = Array.from(this.data.values());
        resolve(arrayFromData);
      }, 500);
    });
  }

  // TODO: store and read data from local storage
}

const sigleton = new TodoMockService();

export default sigleton;
