import React, { useState, useCallback, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import Item from "./Item";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}/api/items`;

const TodoList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {}, []);

  const onItemCreate = useCallback(
    (newItem) => {
      setItems([...items, { ...newItem, id: items.length }]);
    },
    [items]
  );

  const onItemUpdate = useCallback(
    (item) => {
      const index = items.findIndex((i) => i.id === item.id);
      setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
    },
    [items]
  );

  const onItemDelete = useCallback(
    (item) => {
      const index = items.findIndex((i) => i.id === item.id);
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);
    },
    [items]
  );

  return (
    <>
      <AddItemForm onItemCreate={onItemCreate} />
      {items && items.length === 0 && (
        <p className="text-center">No todo items yet!</p>
      )}
      {items &&
        items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
          />
        ))}
    </>
  );
};

export default TodoList;
