'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function TodoFormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="rounded-r-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 focus:outline-none"
    >
      Add Todo
    </button>
  );
}
