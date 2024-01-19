interface BusinessCardLayoutProps {
  children: React.ReactNode
}

export const runtime = "edge"

export default function BusinessCardLayout({
  children,
}: BusinessCardLayoutProps) {
  return (
    <main className="flex flex-col items-center justify-center space-y-8 px-2 py-12">
      {children}
    </main>
  )
}
