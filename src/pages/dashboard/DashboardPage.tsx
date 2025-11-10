import { useLoaderData } from 'react-router'

export async function clientLoader() {
  return {
    title: 'DASHBOARD',
  }
}

export default function DashboardPage() {
  const data = useLoaderData()

  return <h1>{data.title}</h1>
}
