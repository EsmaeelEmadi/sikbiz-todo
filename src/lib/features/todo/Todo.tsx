import { useEffect, useState, useCallback } from "react";

// MOCK
import todoMockService from "../../mock/todo";

// COMPONENTS
import TodoList from "./TodoList";
import Task from "../task/Task";

// TYPES
import type { FC } from "react";
import type { ITask } from "../../types/task";

const Todo: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = useCallback(() => {
    todoMockService.get().then((data) => {
      return setTasks(data);
    });
  }, []);

  const updateTask = useCallback(
    (task: ITask) => {
      todoMockService
        .update(task)
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          fetchTasks();
        });
    },
    [fetchTasks],
  );

  const removeTask = useCallback(
    (id: number) => {
      todoMockService
        .remove(id)
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          fetchTasks();
        });
    },
    [fetchTasks],
  );

  const createTask = useCallback((task:Omit< ITask, 'id'>) => {
    todoMockService.post(task).then(() => {
      fetchTasks();
    });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <Task onCreate={createTask} />

      <TodoList tasks={tasks} onRemove={removeTask} onUpdate={updateTask} />
    </div>
  );
};

export default Todo;
