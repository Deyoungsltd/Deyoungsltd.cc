"use client";
import { site, waLink } from "@/lib/site";

interface PaymentDetailsProps {
  amount: string;
  orderId: string;
}

export function PaymentDetails({ amount, orderId }: PaymentDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm max-w-md mx-auto">
      <h3 className="text-lg font-display font-bold text-stone-900 mb-4">Payment Details</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-100">
          <span className="text-sm text-stone-500">Total Amount</span>
          <span className="text-lg font-bold text-stone-900">₦{amount}</span>
        </div>
        
        <div className="p-4 rounded-xl bg-navy-900 text-white">
          <p className="text-xs uppercase tracking-wider opacity-70 mb-2">Bank Transfer Details</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm opacity-80">Bank Name:</span>
              <span className="text-sm font-semibold">Your Bank Name</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-80">Account Number:</span>
              <span className="text-sm font-semibold">0123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-80">Account Name:</span>
              <span className="text-sm font-semibold">D'Youngs Ltd</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-stone-500 text-center mb-4">
        Once you&apos;ve made the transfer, please send a screenshot of the receipt via WhatsApp to confirm your order.
      </p>
      
      <a
        href={`${waLink()}?text=Hi, I have made a payment of ₦${amount} for Order #${orderId}. Here is my screenshot.`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3 text-center rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20ba5a] transition-colors"
      >
        Confirm Payment via WhatsApp
      </a>
    </div>
  );
}
