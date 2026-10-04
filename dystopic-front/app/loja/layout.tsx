import { CartButton, CartDrawer } from "@/features/loja";

export default function LojaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartButton />
      <CartDrawer />
    </>
  );
}
