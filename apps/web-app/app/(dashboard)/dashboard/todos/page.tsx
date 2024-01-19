import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { client } from "@/lib/wundergraph"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import Todoform from "@/components/todo-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const todos = await client.query({
    operationName: "todos/getAllTodosForCurrentUser",
    input: {
      userId: user.id,
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10 ">
        <main>
          <div className="min-h-screen bg-gray-100 py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
                WunderGraph TodoList
              </h1>
              <div className="rounded-lg bg-white p-6 shadow">
                <Todoform todos={todos} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  )
}
