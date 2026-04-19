import { Link } from "@heroui/link";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-default-200/60 bg-background/70 backdrop-blur-md">
        <div className="container mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-foreground/65">
            (c) {new Date().getFullYear()} FUS-DITP. Built for modern schools.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                className="text-sm text-foreground/70 transition-colors hover:text-emerald-600"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
