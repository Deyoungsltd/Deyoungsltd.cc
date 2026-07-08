import { Metadata } from "next";
import { CommerceExperience } from "@/components/store/CommerceExperience";

export const metadata: Metadata = {
  title: "D'Young Electrical & Electronics",
  description: "Shop appliances, electrical accessories, voltage protection, and request professional electronics repair services in Port Harcourt.",
};

export default function ElectronicsPage() {
  return <CommerceExperience business="electronics" />;
}
