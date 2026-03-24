import RelationshipFutureReportForm from "./RelationshipFutureReportForm";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "रिलेशनशिप भविष्य रिपोर्ट | ज्‍योतिष आशा" : "Relationship Future Report | Jyotishasha",
    description: isHi 
      ? "विवाह की सफलता और भविष्य की पूरी गहराई से जानकारी प्राप्त करें।" 
      : "Get deep insights into marriage success and future compatibility.",
  };
}

export default function ReportPage({ params }: { params: { locale: string } }) {
  return (
    <>
      {/* Razorpay SDK Load */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <RelationshipFutureReportForm locale={params.locale} />
    </>
  );
}