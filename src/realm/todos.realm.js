import Realm from 'realm';
export const TodoSchema = {
  name: 'Todo',
  properties: {
    id: 'int',
    text: 'string',
    complete: 'bool',
  },
  primaryKey: 'id',
};
const realmInstance = new Realm({
  path: 'todos',
  schema: [TodoSchema],
  schemaVersion: 4,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion !== newRealm.schemaVersion) {
      newRealm.deleteAll();
    }
  },
});
export const getTodosFromRealm = () => {
  return realmInstance.objects('Todo');
};
export const addTodo = todo => {
  try {
    const latestTodo = realmInstance.objects('Todo').sorted('id', true)[0];
    const highestId = latestTodo == null ? 0 : latestTodo.id;
    todo.id = highestId + 1;
    realmInstance.beginTransaction();
    realmInstance.create('Todo', {
      id: todo.id,
      text: todo.text,
      complete: todo.complete,
    });
    realmInstance.commitTransaction();
  } catch (err) {
    console.error(err);
    realmInstance.cancelTransaction();
  }
};
export const deleteTodo = id => {
  let toDo = realmInstance.objectForPrimaryKey('Todo', id);
  console.error(toDo);
  try {
    realmInstance.beginTransaction();
    realmInstance.delete(toDo);
    realmInstance.commitTransaction();
  } catch (err) {
    // console.error(err);
    realmInstance.cancelTransaction();
  } finally {
    toDo = null;
  }
};
