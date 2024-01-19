"use client"

import { experimental_useOptimistic as useOptimistic } from "react"
import { TodosGetAllTodosForCurrentUserResponseData } from "@/.wundergraph/generated/models"

import { toggleTodo } from "@/app/actions"

export const Todo = ({
  data,
}: {
  data: NonNullable<
    TodosGetAllTodosForCurrentUserResponseData["db_findManyTodo"]
  >[0]
}) => {
  const [optimisticIsCompleted, setOptimisticIsCompleted] = useOptimistic(
    data?.isCompleted,
    (state, newIsCompleted: boolean) => newIsCompleted
  )

  const handleCheckboxChange = () => {
    setOptimisticIsCompleted(!data.isCompleted)
    toggleTodo(data)
  }

  return (
    <div className="mb-4" key={data.id}>
      <form>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={optimisticIsCompleted}
            onChange={handleCheckboxChange}
            className="form-checkbox rounded text-indigo-600"
          />
          <span className="ml-2 text-gray-800">{data.text}</span>
        </label>
      </form>
    </div>
  )
}
