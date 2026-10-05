/** Dystopic WhatsApp Business: receives orders, tracking requests and returns. */
export const WHATSAPP_NUMBER = "5511934281706";
export const WHATSAPP_DISPLAY = "+55 11 93428-1706";

export function whatsappLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function trackOrderLink(code: string): string {
  return whatsappLink(`Olá! Quero rastrear o pedido ${code} feito no site da Dystopic.`);
}
