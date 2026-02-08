import Image from "next/image";
import Link from "next/link";

import type { ComponentProps, ReactNode } from "react";

type AnchorProps = ComponentProps<"a"> & { href?: string };

function SmartLink({ href, children, ...props }: AnchorProps) {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  if (href && isInternal) {
    return (
      <Link href={href} {...props}>
        {children as ReactNode}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

function MdxImage({ src, alt }: ComponentProps<"img">) {
  if (!src || typeof src !== "string") return null;

  const isExternal = src.startsWith("http");

  return (
    <span className="relative block aspect-video w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-contain"
        unoptimized={isExternal}
      />
    </span>
  );
}

export const mdxComponents = {
  a: SmartLink,
  img: MdxImage,
};
