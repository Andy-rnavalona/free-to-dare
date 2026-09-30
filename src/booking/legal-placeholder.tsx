/** Legal page linked from the booking terms checkbox, still to be written (as in the mockup) */
export function LegalPlaceholder({ title, what }: { title: string; what: string }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <span className="label-mono text-muted-foreground">Legal</span>
      <h1 className="display-xl mt-2 text-4xl md:text-5xl">{title}</h1>
      {/* TODO: publish the real content */}
      <p className="mt-6 text-muted-foreground">
        Our full {what} will be published here shortly.
      </p>
    </main>
  );
}
