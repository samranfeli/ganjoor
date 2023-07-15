import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="main-content-height-mobile md:main-content-height-desktop">
        <div className='mx-auto max-w-6xl px-4'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}