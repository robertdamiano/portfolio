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

export const mdxComponents = {
  a: SmartLink,
};

