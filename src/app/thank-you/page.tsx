import type { Metadata } from "next";
import { ThankYouView } from "@/components/thank-you/ThankYouView";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thank you for reaching out! Your message has been successfully submitted.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouView />;
}
