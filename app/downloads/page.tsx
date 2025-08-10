import { CTAButton } from "@/components/CTAButton";
import { DarkButton } from "@/components/DarkButton";

export default function Downloads() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-4xl font-bold">Downloads</h1>
      <p className="mt-3 text-text/70">
        Swap these links with your GitHub Releases assets when ready.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <CTAButton href="https://example.com/fokus-latest-mac.dmg"> Get for Mac</CTAButton>
        <DarkButton href="https://example.com/fokus-setup-win.exe">⊞ Get for Windows</DarkButton>
      </div>
    </div>
  );
}
