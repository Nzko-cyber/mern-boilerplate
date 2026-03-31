import React from 'react';

import R from 'ramda';
import { useSelector } from 'react-redux';

import Todo from '../Todo';

export default function TodoList() {
  const todos = useSelector(state => state.todos);

  return (
    <ul className="todo-list" data-testid="todo-list">
      {R.reverse(todos).map((todo, index) => <Todo key={todo.id} {...todo} sequentialId={index + 1} />)}
    </ul>
  );
}
