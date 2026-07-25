import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RegistrationStatusBanner } from "./RegistrationStatusBanner";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <RegistrationStatusBanner />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
