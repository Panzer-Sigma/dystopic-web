"use client";

import Link from "next/link";
import { placeOrder, useCart, type CartLine } from "@/store/cart";
import CartLines from "./CartLines";
import { formatPrice } from "../data";
import { trackOrderLink, whatsappLink } from "../whatsapp";

const divider = "border-t-4 border-dotted border-white/90";
const field = "w-full bg-black border-2 border-white/70 px-3 py-2 text-white focus:border-white outline-none";

function orderMessage(code: string, lines: CartLine[], subtotal: number, form: FormData): string {
  const items = lines.map((l) => `• ${l.name} — Tam. ${l.size} — ${l.qty}x ${formatPrice(l.price)}`);
  const notes = String(form.get("notes") ?? "").trim();
  return [
    `Olá! Quero finalizar o pedido ${code} feito no site da Dystopic.`,
    "",
    ...items,
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    `Nome: ${form.get("name")}`,
    `Entrega: ${form.get("address")}`,
    ...(notes ? [`Observações: ${notes}`] : []),
  ].join("\n");
}

/** Checkout: review the cart, fill in delivery details, and send the order to the Dystopic WhatsApp. */
export default function Checkout() {
  const { lines, lastOrder } = useCart();
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const code = placeOrder();
    window.open(whatsappLink(orderMessage(code, lines, subtotal, form)), "_blank", "noopener");
  }

  if (lines.length === 0) {
    return (
      <section className="w-[94%] max-w-xl mt-10 flex flex-col items-center gap-6 text-center font-display text-white z-10">
        {lastOrder ? (
          <>
            <h1 className="text-outline text-3xl md:text-4xl font-bold uppercase">Pedido enviado</h1>
            <p className="tracking-wider">
              Seu pedido <strong>{lastOrder}</strong> foi enviado para o WhatsApp da Dystopic. A confirmação, o frete e o pagamento são combinados por lá.
            </p>
            <a href={trackOrderLink(lastOrder)} target="_blank" rel="noopener noreferrer" className="btn-primary text-xl">
              Rastrear pedido no WhatsApp
            </a>
          </>
        ) : (
          <h1 className="text-outline text-3xl md:text-4xl font-bold uppercase">Seu carrinho está vazio</h1>
        )}
        <Link href="/loja" className="underline uppercase tracking-wider hover:brightness-150">Voltar à loja</Link>
      </section>
    );
  }

  return (
    <section className="w-[94%] md:w-[72%] max-w-5xl grid md:grid-cols-2 gap-8 md:gap-12 mt-6 md:mt-8 font-display text-white z-10">
      <div>
        <h1 className="text-outline text-3xl md:text-4xl font-bold uppercase">Checkout</h1>
        <div className={`${divider} mt-6`} />
        <CartLines lines={lines} />
        <div className={divider} />
        <div className="flex items-baseline justify-between mt-5 text-2xl font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4 md:pt-16">
        <label className="flex flex-col gap-1 uppercase tracking-wider text-sm">
          Nome
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1 uppercase tracking-wider text-sm">
          Endereço de entrega
          <textarea name="address" required rows={3} autoComplete="street-address" placeholder="Rua, número, bairro, cidade, CEP" className={field} />
        </label>
        <label className="flex flex-col gap-1 uppercase tracking-wider text-sm">
          Observações (opcional)
          <textarea name="notes" rows={2} className={field} />
        </label>
        <button type="submit" className="btn-primary self-center mt-4 text-2xl">&gt;Finalizar no WhatsApp</button>
        <p className="text-center text-sm uppercase tracking-widest">A taxa de entrega e o pagamento são combinados no WhatsApp.</p>
        {lastOrder && (
          <a href={trackOrderLink(lastOrder)} target="_blank" rel="noopener noreferrer" className="text-center text-sm underline text-white/70 hover:text-white">
            Rastrear o pedido anterior ({lastOrder})
          </a>
        )}
      </form>
    </section>
  );
}
