"use client";

import { useState } from "react";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar
      className="z-50 border-b border-default-200/60 bg-background/85 backdrop-blur-md"
      classNames={{
        menu: "z-[60] top-[var(--navbar-height)] flex h-[calc(100dvh_-_var(--navbar-height))] bg-background/95 px-6 pt-4 backdrop-blur-xl data-[open=true]:flex",
      }}
      disableAnimation
      // isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      // onMenuOpenChange={setIsMenuOpen}
      position="sticky"
    >
      <NavbarContent className="min-w-0 flex-1 md:basis-1/4 md:flex-none" justify="start">
        <NavbarBrand as="li" className="max-w-full gap-3">
          <NextLink
            className="flex min-w-0 items-center gap-2 text-foreground"
            href="/#home"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* <Logo /> */}
            <p className="truncate font-semibold text-inherit tracking-wide">
              FUS-DTP
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-2" justify="center">
        <ul className="flex gap-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "rounded-full px-3 py-2 text-sm data-[active=true]:text-emerald-600 data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="flex-none gap-1 md:basis-1/4" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            className="bg-emerald-600 text-white font-medium"
            href="/auth/login"
            radius="full"
          >
            Sign In Portal
          </Button>
        </NavbarItem>
        <NavbarItem className="md:hidden">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              className="block w-full rounded-2xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-default-100 hover:text-emerald-600"
              href={item.href}
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            as={Link}
            className="mt-2 w-full bg-emerald-600 text-white font-medium"
            href="/auth/login"
            onPress={() => setIsMenuOpen(false)}
            radius="full"
          >
            Sign In
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
