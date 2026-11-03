import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GymPulse | Gym management", description: "Gym management and member fitness tracking prototype" };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}