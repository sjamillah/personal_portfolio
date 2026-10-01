import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="bg-paper-sunk text-ink-faint">
      <div className="shell flex flex-col gap-2 border-t border-line py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()}
        </p>
        <p>Designed and built by {profile.name}</p>
      </div>
    </footer>
  );
}
