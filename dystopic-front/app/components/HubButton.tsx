import Image from "next/image";
import Link from "next/link";

interface HubButtonProps {
  href: string;
  iconSrc: string;
  textSrc: string;
  altText: string;
  className?: string;
}

export default function HubButton({ href, iconSrc, textSrc, altText, className }: HubButtonProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:brightness-125 z-20 ${className}`}
    >
      <div className="relative aspect-square w-[24vw] min-w-[84px] max-w-[176px]">
        <Image src={iconSrc} alt={`${altText} Icon`} fill className="object-contain" priority />
      </div>
      <div className="relative aspect-[10/3] w-[20vw] min-w-[76px] max-w-[160px]">
        <Image src={textSrc} alt={`${altText} Text`} fill className="object-contain" priority />
      </div>
    </Link>
  );
}