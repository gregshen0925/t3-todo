import { Task } from "@prisma/client";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { trpc } from "../utils/trpc";

type Props = {
  setTodoModalOpen: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Task[]>>;
};

const TodoModal = ({ setTodoModalOpen, setTodos }: Props) => {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    setTodoModalOpen(false);
  };
  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  const [input, setInput] = useState<string>("");
  const { mutate: addTask } = trpc.task.addTask.useMutation({
    onSuccess(data: Task) {
      setTodos((prev) => [...prev, data]);
    },
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };
  const handleCloseModal = () => {
    setTodoModalOpen(false);
  };
  const handleAddTask = () => {
    addTask({ task: input });
    setTodoModalOpen(false);
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75 bg-opacity-80 backdrop-blur-sm">
      <div className="space-y-4 rounded-lg p-3 " ref={clickOutsideRef}>
        <h3 className="text-xl font-semibold text-white">Add Task</h3>
        <input
          type="text"
          onChange={handleChange}
          className="w-full rounded-md border-[1px] border-black bg-gray-300 shadow-sm focus:border-blue-300 focus:ring"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleCloseModal}
            className="rounded-xl bg-gray-500 p-2 text-xs text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="rounded-xl bg-blue-500 p-2 text-xs text-white transition hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
