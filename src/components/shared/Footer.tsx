import { ClickToCopy } from "@/components/shared/ClickToCopy";
import { site } from "@/lib/site";
import { GroupLogo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-onyx-950/50 px-6 py-12 text-white/60">
      <div className="mx-auto max-w-7xl">
        <GroupLogo className="h-7 text-white" />
        <div className="mt-6 grid gap-6 text-sm md:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Contact</p>
            <div className="mt-2 space-y-1">
              <ClickToCopy label={site.phone} value={site.phone} />
              <br />
              <ClickToCopy label={site.email} value={site.email} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">Location</p>
            <p className="mt-2">{site.location}</p>
          </div>
          <div>
            <p className="font-semibold text-white">Businesses</p>
            <p className="mt-2">D&apos;Young Electrical &amp; Electronics</p>
            <p>D&apos;Young&apos;s Pot</p>
          </div>
        </div>
        <p className="mt-8 text-xs text-white/40">
          &copy; {new Date().getFullYear()} D&apos;Young&apos;s Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
