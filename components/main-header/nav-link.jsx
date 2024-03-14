"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import styles from "./nav-link.module.css";

function getDynamicClassNames(dynamicClassNamesObj) {
  return Object.entries(dynamicClassNamesObj).reduce(
    (acc, [className, isTrue]) => {
      return isTrue ? `${acc} ${className}` : acc;
    },
    ""
  );
}

export default function NavLink({ href, children }) {
  const path = usePathname();

  const linkClassNames = useMemo(() => {
    return getDynamicClassNames({
      [styles.link]: true,
      [styles.active]: path === href,
    });
  }, [path]);

  return (
    <Link href={href} className={linkClassNames}>
      {children}
    </Link>
  );
}
