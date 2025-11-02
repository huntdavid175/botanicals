import { createWooCheckout } from "../actions/woocommerce";
import { redirect } from "next/navigation";

export default function CheckoutServerForm({
  itemsJson,
  buttonLabel = "Checkout",
}: {
  itemsJson: string; // stringified [{id, qty}]
  buttonLabel?: string;
}) {
  async function action(formData: FormData) {
    "use server";
    const raw = formData.get("items") as string;
    const items = JSON.parse(raw || "[]") as Array<{ id: number; qty: number }>;
    const { url } = await createWooCheckout({ items });
    redirect(url);
  }

  return (
    <form action={action}>
      <input type="hidden" name="items" value={itemsJson} />
      <button className="mt-4 w-full h-14 rounded-full bg-black text-white text-lg">
        {buttonLabel}
      </button>
    </form>
  );
}
