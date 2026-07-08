export function GroupLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" className={className} fill="none">
      <text x="0" y="28" fontFamily="Georgia, serif" fontSize="26" fontWeight="700" fill="currentColor">
        D&apos;Young&apos;s
      </text>
      <text x="0" y="40" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="3" fill="currentColor" opacity="0.6">
        GROUP
      </text>
    </svg>
  );
}

export function ElectronicsLogo({ className = "h-12" }: { className?: string }) {
  return (
    <img src="/logos/electronics_logo.png" alt="D'Young Electrical & Electronics" className={className} />
  );
}

export function BoleLogo({ className = "h-12" }: { className?: string }) {
  return (
    <img src="/logos/bole_logo.png" alt="D'Young's Pot" className={className} />
  );
}
