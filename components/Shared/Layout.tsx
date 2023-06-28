import Header from "./Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>
        <div className='mx-auto max-w-6xl'>
          {children}
        </div>
      </main>
      <footer>footer</footer>
    </>
  )
}