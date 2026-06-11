export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Summit brought rigor and pragmatism in equal measure. The work outlived their engagement — that is rare and exactly what we needed.",
    name: "Priya Iyer",
    title: "Chief Operating Officer",
    company: "Global Industrial Holdings",
  },
  {
    quote:
      "They combine strategic clarity with the ability to actually deliver. Our team raised its game working alongside theirs.",
    name: "Tom Whitaker",
    title: "Chief Financial Officer",
    company: "North Atlantic Bank",
  },
  {
    quote:
      "Summit's diagnostic was sharper than any we had received. The roadmap they built is still guiding us three years on.",
    name: "Dr. Lina Rossi",
    title: "Chief Executive Officer",
    company: "Meridian Health",
  },
];
