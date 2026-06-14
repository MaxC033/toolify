import Link from "next/link";

export default function NotFound() {
  return (
    <main className="noise-bg min-h-screen flex items-center justify-center">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="relative z-10 text-center px-6">
        <div className="text-8xl mb-6 animate-float">🔍</div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          This page doesn&apos;t exist. But our tools do!
        </p>
        <Link href="/" className="btn-primary text-base px-8 py-3">
          ← Back to all tools
        </Link>
      </div>
    </main>
  );
}
