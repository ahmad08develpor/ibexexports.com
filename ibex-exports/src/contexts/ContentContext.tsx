import { createContext, useContext, useMemo } from "react";
import { useGetContent } from "@workspace/api-client-react";
import {
  SiteContent,
  HeroContent,
  StatItem,
  ProductItem,
  WhyUsItem,
  TestimonialContent,
  CtaBannerContent,
  AboutContent,
  ExportInfoContent,
  BlogPost,
  ContactContent,
  defaultSiteContent,
  defaultHeroContent,
  defaultStats,
  defaultProducts,
  defaultWhyUs,
  defaultTestimonial,
  defaultCtaBanner,
  defaultAbout,
  defaultExportInfo,
  defaultBlog,
  defaultContact,
} from "../lib/content";

interface ParsedContent {
  site: SiteContent;
  hero: HeroContent;
  stats: StatItem[];
  products: ProductItem[];
  why_us: WhyUsItem[];
  testimonial: TestimonialContent;
  cta_banner: CtaBannerContent;
  about: AboutContent;
  export_info: ExportInfoContent;
  blog: BlogPost[];
  contact: ContactContent;
}

const defaultParsedContent: ParsedContent = {
  site: defaultSiteContent,
  hero: defaultHeroContent,
  stats: defaultStats,
  products: defaultProducts,
  why_us: defaultWhyUs,
  testimonial: defaultTestimonial,
  cta_banner: defaultCtaBanner,
  about: defaultAbout,
  export_info: defaultExportInfo,
  blog: defaultBlog,
  contact: defaultContact,
};

const ContentContext = createContext<ParsedContent>(defaultParsedContent);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const { data: blocks } = useGetContent();

  const content = useMemo(() => {
    if (!blocks) return defaultParsedContent;

    const parsed: Partial<ParsedContent> = {};
    for (const block of blocks) {
      try {
        if (block.value) {
          (parsed as any)[block.section] = JSON.parse(block.value);
        }
      } catch (e) {
        console.error(`Failed to parse content for section ${block.section}`, e);
      }
    }

    return {
      site: parsed.site || defaultSiteContent,
      hero: parsed.hero || defaultHeroContent,
      stats: parsed.stats || defaultStats,
      products: parsed.products || defaultProducts,
      why_us: parsed.why_us || defaultWhyUs,
      testimonial: parsed.testimonial || defaultTestimonial,
      cta_banner: parsed.cta_banner || defaultCtaBanner,
      about: parsed.about || defaultAbout,
      export_info: parsed.export_info || defaultExportInfo,
      blog: parsed.blog || defaultBlog,
      contact: parsed.contact || defaultContact,
    };
  }, [blocks]);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
