'use client'

import { useOptimistic, useRef } from 'react'
import { TodosGetAllTodosForCurrentUserResponseData } from '@/.wundergraph/generated/models'
import { ClientResponse } from '@wundergraph/sdk/client'
import { ClientOperationErrors } from '@wundergraph/sdk/operations'

import { addTodo } from '@/app/actions'

import { Todo } from './todo'
import TodoFormButton from './todo-form-button'

export default function Todoform({
  todos,
}: {
  todos: ClientResponse<
    TodosGetAllTodosForCurrentUserResponseData | undefined,
    ClientOperationErrors | undefined
  >
}) {
  const ref = useRef<HTMLFormElement>(null)

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos?.data?.db_findManyTodo ?? [],
    (
      state,
      newTodo: NonNullable<
        TodosGetAllTodosForCurrentUserResponseData['db_findManyTodo']
      >[0]
    ) => [...state, newTodo]
  )

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Todo List</h1>
      {optimisticTodos.map((todo, index) =>
        todo ? <Todo key={index.toString()} data={todo} /> : null
      )}
      <div className="flex items-center">
        <form
          ref={ref}
          action={async (formData) => {
            ref.current?.reset()
            const newTodo = {
              id: Math.random().toString(),
              text: (formData.get('new-todo') as string) ?? '',
              isCompleted: false,
            }
            addOptimisticTodo(newTodo)

            await addTodo(formData)
          }}
        >
          <input
            type="text"
            name="new-todo"
            placeholder="New todo text"
            className="form-input grow rounded-l-lg border-r-0 p-2 focus:border-indigo-300 focus:ring-0"
          />
          <TodoFormButton />
        </form>
      </div>
    </>
  )
}
