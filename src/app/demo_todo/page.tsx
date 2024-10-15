"use client";

import React, { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Icon from "@/utils/icon";
import { generateUniqueId } from "@/utils/general";
import "./page.css";

const IconFontLoader = dynamic(() => import("@/utils/icon_loader"), {
  ssr: false,
});

interface Item {
  id: string;
  text: string;
  completed: boolean;
}

const CompleteIcon: React.FC<{ completed?: boolean; onClick: () => void }> = ({
  completed,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "inline-flex justify-center items-center rounded-full border-1 border-gray-300 overflow-hidden",
        completed ? "border-transparent" : ""
      )}
    >
      <Icon
        className="text-white p-1"
        style={
          completed ? { backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)" } : {}
        }
        icon={completed ? "duigou" : ""}
        onClick={onClick}
      />
    </div>
  );
};

const TodoItem: React.FC<{
  todo: Omit<Item, "id">;
  noLine?: boolean;
  onComplete: () => void;
  onTextChange: (text: string) => void;
  onEnterPress?: () => void;
  onDelete?: () => void;
  className?: string;
}> = ({
  todo,
  noLine,
  onComplete,
  onTextChange,
  onDelete,
  className,
  onEnterPress,
}) => {
  const [prevCompleted, setPrevCompleted] = useState(todo.completed);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (prevCompleted !== todo.completed) {
      setIsAnimated(true)
      setPrevCompleted(todo.completed)
      setTimeout(() => {
        setIsAnimated(false)
      }, 900)
    }
  }, [todo.completed, prevCompleted]);

  return (
    <div
      className={clsx(
        "flex items-center gap-2 px-3 py-2 rounded-lg bg-white",
        className,
        isAnimated && !noLine ? "bounceOutRight" : ""
      )}
    >
      <CompleteIcon completed={todo.completed} onClick={onComplete} />
      <input
        className="flex-1 p-2 border-none focus:outline-none"
        style={{
          textDecoration: todo.completed && !noLine ? "line-through" : "none",
        }}
        type="text"
        value={todo.text}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterPress?.();
          }
        }}
      />
      {onDelete && (
        <Icon
          className="flex-shrink-0 p-1 text-red-400"
          icon="delete"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default function DemoTodo() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({
    text: "",
    completed: false,
  });

  const handleAdd = () => {
    setItems([...items, { ...newItem, id: generateUniqueId() }]);
    setNewItem({ text: "", completed: false });
  };

  const handleTextChange = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index].text = text;
    setItems(newItems);
  };

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleComplete = (index: number) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  const [comletedCount, totalCount] = useMemo(() => {
    return [
      items.filter((item) => item.completed).length,
      items.length,
    ];
  }, [items]);

  return (
    <div className="h-screen overflow-hidden header-bg">
      <IconFontLoader />
      <div className="m-auto w-1/2 flex flex-col h-full">
        <h2 className="text-2xl font-bold mt-16 mb-4 mx-2 text-white">TODO</h2>
        <TodoItem
          todo={newItem}
          noLine={true}
          onComplete={() =>
            setNewItem({ ...newItem, completed: !newItem.completed })
          }
          onTextChange={(text) => setNewItem({ ...newItem, text })}
          onEnterPress={handleAdd}
          className="border border-gray-300 mb-4 mx-2 rounded-lg"
        />
        <div className='flex-1 overflow-hidden pb-4 px-2'>
          <div
            className="max-h-full overflow-auto bg-white rounded-lg shadow-md [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-100 font-mono"
          >
            {items.map((item, index) => (
              <div key={item.id}>
                <TodoItem
                  todo={item}
                  onComplete={() => handleComplete(index)}
                  onTextChange={(text) => handleTextChange(index, text)}
                  onDelete={() => handleDelete(index)}
                />
              </div>
            ))}
            {totalCount > 0 && (
              <div className="flex justify-between items-center px-4 py-3 sticky bottom-0 bg-white">
                <div>
                  Total items: {comletedCount} / {totalCount}
                </div>
                {(comletedCount !== totalCount) ? (
                  <div className="cursor-pointer hover:text-blue-500" onClick={() => setItems(items.map((item) => ({ ...item, completed: true })))}>
                    All Active Completed
                  </div>
                ) : null}
                {(comletedCount !== 0) ? (
                  <div className="cursor-pointer hover:text-blue-500" onClick={() => setItems(items.map((item) => ({ ...item, completed: false })))}>
                    Clear completed
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
