export interface Tool {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  keywords: string[];
  icon: string;
  faqItems: {
    question: string;
    answer: string;
  }[];
}
