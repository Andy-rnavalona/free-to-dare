import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** The public landing page: its own header over the hero video, and the footer. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      {children}
      <SiteFooter />
      <ScrollReveal />
    </div>
  );
}
