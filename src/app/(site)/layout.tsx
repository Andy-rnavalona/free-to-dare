import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** The public landing pages: a header over their hero, and the shared footer. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader overHero />
      {children}
      <SiteFooter />
      <ScrollReveal />
    </div>
  );
}
