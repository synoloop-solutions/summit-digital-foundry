import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { resources } from "@/data/resources";
import { images } from "@/data/images";
import { saveSubmission, downloadBlob } from "@/lib/storage";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Summit Advisory Group" },
      { name: "description", content: "Whitepapers, guides, toolkits, and reports from Summit Advisory Group." },
      { property: "og:title", content: "Resources — Summit Advisory Group" },
      { property: "og:description", content: "Whitepapers, guides, toolkits, and reports." },
      { property: "og:url", content: "/resources" },
      { property: "og:image", content: images.heroInsights },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const schema = z.object({ name: z.string().min(2), email: z.string().email(), company: z.string().min(2) });
type Values = z.infer<typeof schema>;

function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Practical tools for executive teams" description="Download whitepapers, toolkits, and reports from our partners." image={images.heroInsights} />
      <div className="mx-auto max-w-7xl px-6 pt-8"><Breadcrumbs items={[{ label: "Resources" }]} /></div>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-6 md:grid-cols-2">
        {resources.map((r) => <ResourceRow key={r.slug} r={r} />)}
      </section>
    </>
  );
}

function ResourceRow({ r }: { r: (typeof resources)[number] }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = (v: Values) => {
    saveSubmission("downloads", { ...v, slug: r.slug, title: r.title });
    downloadBlob(`${r.slug}.pdf`, `Summit Advisory Group\n${r.title}\n${r.type} · ${r.pages} pages\n\n${r.summary}\n`, "application/pdf");
    setDone(true);
  };
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{r.type} · {r.pages} pages</p>
      <h2 className="mt-2 font-serif text-lg text-[var(--navy-deep)]">{r.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground flex-1">{r.summary}</p>
      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setDone(false); reset(); } }}>
        <DialogTrigger asChild>
          <Button className="mt-4 self-start bg-[var(--navy-deep)] text-white hover:bg-[var(--navy)]"><Download className="h-4 w-4" /> Download</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>{r.title}</DialogTitle></DialogHeader>
          {done ? (
            <p className="text-sm">Your download has started. Thanks!</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
              <div><Label htmlFor={`r-${r.slug}-name`}>Name</Label><Input id={`r-${r.slug}-name`} {...register("name")} />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
              <div><Label htmlFor={`r-${r.slug}-email`}>Work email</Label><Input id={`r-${r.slug}-email`} type="email" {...register("email")} />{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}</div>
              <div><Label htmlFor={`r-${r.slug}-co`}>Company</Label><Input id={`r-${r.slug}-co`} {...register("company")} />{errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}</div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--navy-deep)] text-white hover:bg-[var(--navy)]">Download {r.type}</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
