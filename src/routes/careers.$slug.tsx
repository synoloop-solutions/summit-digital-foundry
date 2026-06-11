import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getJob } from "@/data/careers";
import { images } from "@/data/images";
import { saveSubmission } from "@/lib/storage";
import { Check } from "lucide-react";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const job = getJob(params.slug);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ params, loaderData }) => {
    const j = loaderData?.job;
    return {
      meta: [
        { title: `${j?.title ?? "Role"} — Careers — Summit Advisory Group` },
        { name: "description", content: j?.summary ?? "" },
        { property: "og:title", content: j?.title ?? "Role" },
        { property: "og:description", content: j?.summary ?? "" },
        { property: "og:url", content: `/careers/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/careers/${params.slug}` }],
    };
  },
  component: JobDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-[var(--navy-deep)]">Role not found</h1>
      <Link to="/careers" className="mt-6 inline-block underline">All roles</Link>
    </div>
  ),
});

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  linkedin: z.string().url().optional().or(z.literal("")),
  message: z.string().min(20, "Tell us a little about yourself"),
});
type Values = z.infer<typeof schema>;

function JobDetail() {
  const { job } = Route.useLoaderData();
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  return (
    <>
      <PageHero eyebrow={`${job.team} · ${job.location}`} title={job.title} description={job.summary} image={images.heroCareers} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Breadcrumbs items={[{ label: "Careers", to: "/careers" }, { label: job.title }]} />
      </div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-serif text-2xl text-[var(--navy-deep)]">What you'll do</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">{job.responsibilities.map((r: string) => <li key={r}>{r}</li>)}</ul>
          <h2 className="mt-10 font-serif text-2xl text-[var(--navy-deep)]">What we look for</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground">{job.qualifications.map((q: string) => <li key={q}>{q}</li>)}</ul>
        </div>
        <aside className="rounded-2xl border border-border bg-[var(--surface)] p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-serif text-lg text-[var(--navy-deep)]">Apply for this role</h3>
          {done ? (
            <p className="mt-4 inline-flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-[var(--gold)]" /> Application received.</p>
          ) : (
            <form onSubmit={handleSubmit((v) => { saveSubmission("applications", { ...v, role: job.slug }); setDone(true); })} className="mt-4 space-y-3" noValidate>
              <div><Label htmlFor="a-name">Full name</Label><Input id="a-name" {...register("name")} /></div>
              <div><Label htmlFor="a-email">Email</Label><Input id="a-email" type="email" {...register("email")} /></div>
              <div><Label htmlFor="a-linkedin">LinkedIn (optional)</Label><Input id="a-linkedin" placeholder="https://linkedin.com/in/…" {...register("linkedin")} /></div>
              <div><Label htmlFor="a-msg">Message</Label><Textarea id="a-msg" rows={4} {...register("message")} />{errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}</div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--navy-deep)] text-white hover:bg-[var(--navy)]">Submit application</Button>
            </form>
          )}
        </aside>
      </section>
    </>
  );
}
