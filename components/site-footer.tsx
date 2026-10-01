import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="night border-t border-line bg-paper text-ink-faint">
      <div className="shell flex flex-col gap-3 py-8 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()}
        </p>
        <p>Designed and built by {profile.name}</p>
      </div>
    </footer>
  );
}
