import { jsonLdScript, personJsonLd } from "@/lib/seo";
import { Hero } from "@/sections/home/Hero";
import { Statement } from "@/sections/home/Statement";
import { Principles } from "@/sections/home/Principles";
import { Work } from "@/sections/home/Work";
import { Film } from "@/sections/home/Film";
import { Skills } from "@/sections/home/Skills";
import { About } from "@/sections/home/About";
import { Contact } from "@/sections/home/Contact";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(personJsonLd())} />
      <Hero />
      <Statement />
      <Principles />
      <Work />
      <Film />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
