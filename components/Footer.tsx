export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-text/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} fokus</div>
          <div className="space-x-6">
            <a href="/downloads" className="hover:text-text">Downloads</a>
            <a href="mailto:hello@fokus.app" className="hover:text-text">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
