"use server";

// Server Action to create a WooCommerce order and return a checkout URL
// Env vars required:
// - WOOCOMMERCE_SITE_URL (e.g., https://example.com)
// - WOOCOMMERCE_CONSUMER_KEY
// - WOOCOMMERCE_CONSUMER_SECRET

// DEV-ONLY: allow self-signed certs locally so fetch doesn't fail TLS
// This impacts only the Node process and should never run in production.
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

type CheckoutItem = { id: number | string; qty: number };

export async function createWooCheckout({
  items,
  customer,
}: {
  items: CheckoutItem[];
  customer?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
}): Promise<{ url: string }> {
  const site = process.env.WOOCOMMERCE_SITE_URL;
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!site || !key || !secret) {
    throw new Error("WooCommerce env vars missing");
  }

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  // Resolve product IDs (support numeric ids and slugs)
  const line_items: Array<{ product_id: number; quantity: number }> = [];
  for (const it of items || []) {
    let productId: number | undefined;
    if (typeof it.id === "number") {
      productId = it.id;
    } else {
      const lookup = await fetch(
        `${site}/wp-json/wc/v3/products?slug=${encodeURIComponent(it.id)}`,
        {
          headers: { Authorization: `Basic ${auth}` },
          cache: "no-store",
        }
      );
      if (lookup.ok) {
        const arr = await lookup.json();
        productId =
          Array.isArray(arr) && arr[0]?.id ? Number(arr[0].id) : undefined;
      }
    }
    if (!productId) continue;
    line_items.push({ product_id: productId, quantity: it.qty || 1 });
  }

  const body: any = {
    payment_method: "",
    payment_method_title: "",
    set_paid: false,
    line_items,
  };

  if (customer?.email) body.billing = { email: customer.email };
  if (customer?.first_name || customer?.last_name) {
    body.billing = {
      ...(body.billing || {}),
      first_name: customer?.first_name,
      last_name: customer?.last_name,
    };
  }

  // Create pending order
  const base = site.replace(/\/$/, "");
  const endpoint = `${base}/wp-json/wc/v3/orders`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
    // Server Action; no need for Next caching here
    cache: "no-store",
  });

  if (!res.ok) {
    // Fallback: Some hosts strip Authorization headers. Try query param auth.
    if (res.status === 401) {
      const qp = `${endpoint}?consumer_key=${encodeURIComponent(
        key
      )}&consumer_secret=${encodeURIComponent(secret)}`;
      const res2 = await fetch(qp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      });
      if (!res2.ok) {
        const text2 = await res2.text();
        throw new Error(
          `Woo order create failed (fallback): ${res2.status} ${text2}. Check REST keys (Read/Write), HTTPS, and server passing Authorization header.`
        );
      }
      const json2 = await res2.json();
      const orderId2: number | undefined = json2?.id;
      const orderKey2: string | undefined = json2?.order_key;
      if (!orderId2 || !orderKey2) {
        throw new Error("Woo order response missing id/order_key (fallback)");
      }
      const url2 = `${base}/checkout/order-pay/${orderId2}/?pay_for_order=true&key=${orderKey2}`;
      return { url: url2 };
    }
    const text = await res.text();
    throw new Error(`Woo order create failed: ${res.status} ${text}`);
  }
  const json = await res.json();

  const orderId: number | undefined = json?.id;
  const orderKey: string | undefined = json?.order_key;
  if (!orderId || !orderKey) {
    throw new Error("Woo order response missing id/order_key");
  }

  // Build pay URL: {site}/checkout/order-pay/{orderId}/?pay_for_order=true&key={orderKey}
  const url = `${site}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${orderKey}`;
  return { url };
}

// Convenience server action to use directly as a form action from Client components
export async function checkoutFromForm(formData: FormData) {
  "use server";
  const raw = formData.get("items") as string;
  const items = JSON.parse(raw || "[]") as CheckoutItem[];
  const { url } = await createWooCheckout({ items });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - next/navigation available in server action call sites
  const { redirect } = await import("next/navigation");
  redirect(url);
}

// Store API cart flow via WP endpoint (recommended for full /checkout UI)
function b64url(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export async function checkoutStoreFromForm(formData: FormData) {
  "use server";
  const site = process.env.WOOCOMMERCE_SITE_URL as string;
  const secret = process.env.WOO_SHARED_SECRET as string;
  const restKey = process.env.WOOCOMMERCE_CONSUMER_KEY as string | undefined;
  const restSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET as
    | string
    | undefined;
  if (!site || !secret)
    throw new Error("Missing WOOCOMMERCE_SITE_URL or WOO_SHARED_SECRET");
  const itemsRaw = formData.get("items") as string;
  let items: CheckoutItem[] = [];
  try {
    items = JSON.parse(itemsRaw || "[]");
  } catch {}

  // Resolve string IDs (slugs) to numeric Woo product IDs so WP can add_to_cart
  if (Array.isArray(items) && restKey && restSecret) {
    const base = site.replace(/\/$/, "");
    const auth = Buffer.from(`${restKey}:${restSecret}`).toString("base64");
    for (const it of items) {
      if (typeof it.id === "string") {
        try {
          const resp = await fetch(
            `${base}/wp-json/wc/v3/products?slug=${encodeURIComponent(it.id)}`,
            { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" }
          );
          if (resp.ok) {
            const arr = await resp.json();
            const prodId =
              Array.isArray(arr) && arr[0]?.id ? Number(arr[0].id) : 0;
            if (prodId) it.id = prodId;
          }
        } catch {}
      }
    }
  }

  const payload = b64url(JSON.stringify(items || []));
  // Sign payload using HMAC-SHA256 and encode signature as base64url (no padding)
  const sigBase64: string = require("crypto")
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64");
  const sig = sigBase64
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const base = site.replace(/\/$/, "");
  const url = `${base}/wp-json/headless/v1/cart-import?payload=${encodeURIComponent(
    payload
  )}&sig=${encodeURIComponent(sig)}`;
  const { redirect } = await import("next/navigation");
  redirect(url);
}
