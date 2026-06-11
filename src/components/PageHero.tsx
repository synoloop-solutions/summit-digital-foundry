export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--navy-deep)] text-white">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/85 to-[var(--navy-deep)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl max-w-4xl">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-white/85">{description}</p>}
      </div>
    </section>
  );
}
