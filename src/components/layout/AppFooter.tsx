export function AppFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant font-body-sm text-body-sm text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="font-semibold text-on-surface">EventPulse</span>
          <span>© 2025 AI Post Suite. Professional Thought Leadership Engine.</span>
        </div>
        <div className="flex items-center gap-6">
          <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-on-surface transition-colors" href="#">Documentation</a>
        </div>
      </div>
    </footer>
  );
}
