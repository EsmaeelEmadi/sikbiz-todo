import { useState } from "react";

// TYPES
import type { FC } from "react";
import { ITask, TaskStatus } from "../../types/task";

interface ITaskProps {
  task?: ITask;
  onRemove?: (id: number) => void;
  onUpdate?: (task: ITask) => void;
  onCreate?: (task: Omit<ITask, "id">) => void;
}

const Task: FC<ITaskProps> = ({ task, onUpdate, onRemove, onCreate }) => {
  const [title, setTitle] = useState<string>(task?.title ?? "");
  const [description, setDescription] = useState<string>(
    task?.description ?? "",
  );
  const [status, setStatus] = useState<keyof typeof TaskStatus>(
    task?.status ?? TaskStatus.TODO,
  );

  const didChange =
    task?.description !== description ||
    task?.title !== title ||
    task?.status !== status;

  return (
    <div className="flex flex-col border-red-400 border gap-4 align-middle justify-center p-4">
      <label htmlFor="title">
        title
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-4 ml-4"
        />
      </label>

      <label htmlFor="descripion">
        description
        <input
          name="descripion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-4 ml-4"
        />
      </label>

      <label htmlFor="status">
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as keyof typeof TaskStatus)}
        >
          {Object.values(TaskStatus).map((value) => {
            return <option value={value} key={value}>{value}</option>;
          })}
        </select>
      </label>

      {onCreate ? (
        <button onClick={() => onCreate({ status, title, description })}>
          create
        </button>
      ) : (
        <>
          <button
            disabled={!didChange}
            // NOTE: no time to solve it
            onClick={() => {
              if (onUpdate) {
                onUpdate({ id: task!.id, description, title, status });
              }
            }}
          >
            submit changes
          </button>

          <button
            onClick={() => {
              if (onRemove) {
                onRemove(task!.id);
              }
            }}
          >
            remove
          </button>
        </>
      )}
    </div>
  );
};

export default Task;
