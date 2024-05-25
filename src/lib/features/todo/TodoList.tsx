// TYPES
import type { FC } from "react";
import { ITask, TaskStatus } from "../../types/task";
import Task from "../task/Task";

interface ITodoListProps {
  tasks: ITask[];
  onRemove(id: number): void;
  onUpdate(task: ITask): void;
}

const TodoList: FC<ITodoListProps> = ({ tasks, onUpdate, onRemove }) => {
  return (
    <div>
      {Object.values(TaskStatus).map((key) => {
        return (
          <div key={key}>
            <h4>{key}</h4>
            <div>
              {tasks
                .filter((task) => {
                  return task.status === key;
                })
                .map((task) => {
                  return (
                    <Task
                      task={task}
                      onUpdate={onUpdate}
                      onRemove={onRemove}
                      key={task.id}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
