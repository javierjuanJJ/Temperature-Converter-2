import { TemperatureConverter } from "@/components/TemperatureConverter"

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative temperature-themed gradient: cool above, warm below */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.12),transparent_55%)]" />
      </div>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-8"
      >
        <TemperatureConverter />
      </main>
    </div>
  )
}

export default App
