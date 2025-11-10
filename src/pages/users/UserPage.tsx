import { useLoaderData } from 'react-router'

export async function clientLoader() {
  const user: { name: string } = await fetchUser()

  return { name: user.name }
}

async function fetchUser(): Promise<{ name: string }> {
  return new Promise((resolve) => setTimeout(() => resolve({ name: 'John' }), 3000))
}

export default function UserPage() {
  const data = useLoaderData()

  return <h1>My name is {data.name}</h1>
}
