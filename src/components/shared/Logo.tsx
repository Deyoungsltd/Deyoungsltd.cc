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

export function ElectronicsLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 40" className={className} fill="none">
      <circle cx="14" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M14 12v16M8 20h12" stroke="currentColor" strokeWidth="2" />
      <text x="32" y="27" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="700" fill="currentColor">
        D&apos;Young Electrical
      </text>
    </svg>
  );
}

export function BoleLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" className={className} fill="none">
      <path d="M14 28c0-8 6-14 12-14s12 6 12 14" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="36" y="27" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="currentColor">
        D&apos;Young&apos;s Pot
      </text>
    </svg>
  );
}
