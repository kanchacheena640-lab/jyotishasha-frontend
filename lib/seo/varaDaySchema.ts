import {
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";
import { VaraDetail } from "@/lib/data/varaData";

export function getVaraDaySchemas(data: VaraDetail, isHi: boolean) {
  const faqItems = data.faq.map((item) => ({
    q: isHi ? item.question.hi : item.question.en,
    a: isHi ? item.answer.hi : item.answer.en,
  }));

  const langPath = isHi ? "/hi" : "";

  return {
    faqSchema: buildFAQPageSchema(faqItems),

    breadcrumbSchema: buildBreadcrumbSchema([
      {
        name: isHi ? "होम" : "Home",
        url: langPath || "/",
      },
      {
        name: isHi ? "पंचांग" : "Panchang",
        url: `${langPath}/panchang`,
      },
      {
        name: isHi ? "वार" : "Vara",
        url: `${langPath}/vara`,
      },
      {
        name: isHi ? data.basic.hindiName : data.basic.englishName,
        url: `${langPath}/vara/${data.basic.slug}`,
      },
    ]),
  };
}
