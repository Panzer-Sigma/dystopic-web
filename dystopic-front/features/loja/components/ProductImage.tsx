import Image from "next/image";

interface ProductImageProps {
  src?: string;
  alt: string;
  sizes: string;
  /** Tailwind aspect class for the frame; photos are 2:3 portraits cropped to fit. */
  aspect?: string;
  priority?: boolean;
}

/** Product photo in a fixed frame, or a dark panel when there is no photo. */
export default function ProductImage({ src, alt, sizes, aspect = "aspect-square", priority }: ProductImageProps) {
  return (
    <div className={`relative w-full ${aspect} overflow-hidden bg-neutral-900`}>
      {src && <Image src={src} alt={alt} fill className="object-cover object-[center_25%]" sizes={sizes} priority={priority} />}
    </div>
  );
}
