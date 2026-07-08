import { Metadata } from "next";
import { CommerceExperience } from "@/components/store/CommerceExperience";

export const metadata: Metadata = {
  title: "D'Young's Pot",
  description: "Order authentic Port Harcourt bole, roasted yam, roasted potato, grilled fish, and combo platters. No drinks.",
};

export default function BolePage() {
  return <CommerceExperience business="bole" />;
}
