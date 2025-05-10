import ClientEnv from "./_components/ClientEnv"

export default function page() {
  return (
    <>
      <div>SSR: {process.env.TOKEN}</div>
      <ClientEnv />
    </>
  )
}
