'use client'

import CTA from "@/app/components/ui/CTA";
import FAQs from "@/app/components/ui/FAQs";
import Features from "@/app/components/ui/Features";
import Hero from "@/app/components/ui/Hero";
import Pricing from "@/app/components/ui/Pricing";
import Testimonial from "@/app/components/ui/Testimonial";
import VisualFeatures from "@/app/components/ui/VisualFeatures";

export default function Home() {
  return (
    <>
      <Hero />
      <VisualFeatures />
      <Features />
      <CTA />
      <Testimonial />
      <Pricing />
      <FAQs />
    </>
  );
}

