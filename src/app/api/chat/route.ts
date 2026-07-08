import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type History = { role: string; content: string }[];

function replyFor(message: string): string {
  const m = message.toLowerCase();

  if (/(repair|fix|broken|fault|service|technician)/.test(m))
    return "We offer professional repair services for electronics and appliances. Submit a repair request from the Electronics page and we'll send a cost estimate plus live status tracking. Want the link?";

  if (/(bole|plantain|yam|potato|fish|combo|meal|food|eat|hungry)/.test(m))
    return "Our kitchen serves authentic Port Harcourt bole — roasted plantain, yam, potato, grilled fish and combo platters (no drinks). Open the Bole page to browse the menu and order in a few taps.";

  if (/(tv|fridge|freezer|ac|air ?condition|washer|washing|appliance|stabilizer|voltage|socket|bulb|cable)/.test(m))
    return "We stock home appliances, electrical accessories and voltage-protection gear built for Nigerian power. Visit the Electronics store to shop, or tell me the exact item and I'll point you to it.";

  if (/(order|track|status|where.*my|deliver)/.test(m))
    return "Track any order with the order number from your confirmation — there's a Tracking page for each business. Paste your number there to see live status.";

  if (/(price|cost|how much|naira|₦|fee)/.test(m))
    return "Prices are listed in naira on each product. Our Electronics and Bole stores show current prices. Tell me the specific item and I'll quote it.";

  if (/(location|port harcourt|rivers|address|where are you)/.test(m))
    return "We're based in Port Harcourt, Rivers State, Nigeria, and deliver locally. Share your area and we'll confirm coverage.";

  if (/(contact|call|phone|email|reach|whatsapp)/.test(m))
    return "Reach us at 09069941929 (call/WhatsApp) or deyoungsltd@gmail.com. The WhatsApp button is bottom-left, and every contact on the site is click-to-copy.";

  if (/(hour|open|time|close|today)/.test(m))
    return "Our hours are Mon–Sat, 8:00 AM – 8:00 PM. Message anytime and we'll reply during business hours.";

  if (/(admin|login|dashboard|manage|password)/.test(m))
    return "The admin panel is at /admin (email deyoungsltd@gmail.com). Please change the default password right after your first login.";

  if (/(hi|hello|hey|good morning|good evening|thanks|thank you)/.test(m))
    return "Hello! I'm the D'Young's assistant. I can help with electronics, repairs, our bole menu, orders, or contacting the team. What do you need?";

  return "Thanks for reaching out! I can help with our electronics store, repair services, the bole menu, order tracking, or contacting the team. What would you like to explore?";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message?: string;
      history?: History;
    };
    const message = (body.message || "").toString().slice(0, 1000).trim();
    if (!message)
      return NextResponse.json({ reply: "Please type a message." });
    return NextResponse.json({ reply: replyFor(message) });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Something went wrong. Please reach us on WhatsApp at 09069941929.",
      },
      { status: 500 }
    );
  }
}