import { Fingerprint } from "lucide-react";

export function ProfileBanner() {
  return (
    <div className="h-64 md:h-80 bg-secondary relative border-b border-border overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      <Fingerprint className="h-32 w-32 text-foreground/5" />
    </div>
  );
}
