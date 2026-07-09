"use client";
import { useEffect, useState } from "react";
import { PaymentDetails } from "@/components/shared/PaymentDetails";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: "Loading...",
    accountNumber: "Loading...",
    accountName: "Loading...",
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setBankDetails({
          bankName: data.bank_name || "OPay",
          accountNumber: data.bank_account || "9159328832",
          accountName: data.bank_account_name || "Wike-young Kennedy",
        });
      } catch (e) {
        console.error("Failed to load bank settings", e);
      }
    }
    fetchSettings();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", params.id);

    try {
      const res = await fetch("/api/payment/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setSuccess(true);
    } catch (err) {
      alert("Failed to upload screenshot. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Reveal>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-stone-900">Complete Your Order</h1>
            <p className="text-stone-500 mt-2">Please make the transfer and upload your receipt</p>
          </div>

          {!success ? (
            <div className="space-y-6">
              <PaymentDetails 
                amount="TBD" 
                orderId={params.id} 
                bankName={bankDetails.bankName}
                accountNumber={bankDetails.accountNumber}
                accountName={bankDetails.accountName}
              />
              
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">
                  Upload Payment Screenshot
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={uploading}
                  />
                  <div className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-stone-300 rounded-xl group-hover:border-navy-900 transition-colors text-stone-500 text-sm bg-stone-50">
                    <span className="font-medium">{uploading ? "Uploading..." : "Click to upload screenshot"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Receipt Uploaded!</h2>
              <p className="text-stone-500 mb-6">Our admin is verifying your payment. You will be notified once it's confirmed.</p>
              <button 
                onClick={() => router.push("/")}
                className="w-full py-3 rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </main>
  );
}
