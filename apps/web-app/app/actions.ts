"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { TodosGetAllTodosForCurrentUserResponseData } from "@/.wundergraph/generated/models"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { client } from "@/lib/wundergraph"

export const toggleTodo = async (
  data: NonNullable<
    TodosGetAllTodosForCurrentUserResponseData["db_findManyTodo"]
  >[0]
) => {
  await client.mutate({
    operationName: "todos/updateTodo",
    input: {
      ...data,
      isCompleted: !data.isCompleted,
    },
  })

  revalidatePath("/")
}

export const addTodo = async (data: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const newTodo = {
    text: (data.get("new-todo") ?? "") as string,
    userId: user.id,
  }

  await client.mutate({
    operationName: "todos/addTodo",
    input: newTodo,
  })

  revalidatePath("/")
}
