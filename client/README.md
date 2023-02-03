### Create

```
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

const TodoList = () => {
   const [items, setItems] = useState([]);

   const onItemCreate = useCallback(
       (newItem) => {
           axios.post(`${BASE_URL}/items`, newItem).then((res) => {
               setItems([...items, { ...newItem, id: res.itemId }]);
           });
       },
       [items]
   );
//...

```

### Read

In the TodoList.js component, add the following code:

```
import React, { useState, useCallback, useEffect } from 'react';
// ...
const TodoList = () => {
   // ...
   useEffect(() => {
       axios.get(BASE_URL).then((res) => setItems(res.data));
   }, []);

```

### Update

In the client application, in The TodoList.js component, locate the onItemUpdate function and replace it with the following code:

```
const onItemUpdate = useCallback(
       (item) => {
           axios
               .put(`${BASE_URL}/${item.id}`, { completed: item.completed })
               .then(() => {
                   const index = items.findIndex((i) => i.id === item.id);
                   setItems([
                       ...items.slice(0, index),
                       item,
                       ...items.slice(index + 1),
                   ]);
               });
       },
       [items]
   );

```

### Delete

In the TodoList component in the client project, locate the onItemDelete function and replace it with the following:

```
const onItemDelete = useCallback(
       (item) => {
           axios.delete(`${BASE_URL}/${item.id}`).then(() => {
               const index = items.findIndex((i) => i.id === item.id);
               setItems([...items.slice(0, index), ...items.slice(index + 1)]);
           });
       },
       [items]
   );

```
