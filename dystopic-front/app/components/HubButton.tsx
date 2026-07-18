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
      className={`absolute flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:brightness-125 z-20 ${className}`}
    >
      <div className="relative w-32 h-32 md:w-44 md:h-44">
        <Image src={iconSrc} alt={`${altText} Icon`} fill className="object-contain" priority />
      </div>
      <div className="relative w-28 h-8 md:w-40 md:h-12">
        <Image src={textSrc} alt={`${altText} Text`} fill className="object-contain" priority />
      </div>
    </Link>
  );
}