import {
  Exo_2 as FontBrand,
  Fira_Code as FontMono,
  Sora as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontBrand = FontBrand({
  subsets: ["latin"],
  weight: ["600", "700"],
});
