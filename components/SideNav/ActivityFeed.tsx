"use client";

import { ElementType } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Button from "components/Button";

interface SideNavItemProps {
  title: string;
  icon?: ElementType;
  href?: string;
  isExpanded: boolean;
}

export default function ActivityFeed({
  title,
  icon: Icon,
  href,
  isExpanded,
}: SideNavItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Button
      className={`button-sidenav ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {Icon && <Icon />}
      {isExpanded && <span className="nav-text">{title}</span>}
    </Button>
  );
}
