export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>header</header>
      <main>
        <div className='mx-auto max-w-6xl'>
          {children}
        </div>
      </main>
      <footer>footer</footer>
    </>
  )
}