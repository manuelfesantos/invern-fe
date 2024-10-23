"use client";
import React from "react";
import Link from "next/link";

export const CustomLink = ({
  children,
  position,
  onClick,
  href,
}: {
  children: any;
  position?: string;
  onClick?: () => void;
  href: string;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${position} text-[#E88A1A] hover:text-[#ECB365]`}
    >
      {children}
    </Link>
  );
};
