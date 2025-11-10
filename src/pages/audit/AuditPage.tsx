import { useLoaderData } from 'react-router'

export async function clientLoader() {
  // throw new Error("Ошибка в clientLoader Audit");
  return {
    title: 'AUDIT',
  }
}

export default function Audit() {
  const data = useLoaderData()
  // throw new Error('Ошибка в компоненте Audit')

  return <h1>{data.title}</h1>
}
