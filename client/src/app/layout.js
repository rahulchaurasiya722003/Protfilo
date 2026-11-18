import { Sora } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/theme-provider";

const sora = Sora({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Rahul Chaurasiya | Full-Stack Developer Portfolio",
  description:
    "Official Portfolio of Rahul Chaurasiya — Full-Stack Developer experienced in React.js, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, REST APIs, and AI/Automation Workflows.",
  keywords: [
    "Rahul Chaurasiya",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "SmartCart",
    "NexaCRM",
    "Float Chat",
    "Unified MCM",
    "Acepeak",
    "Mumbai Developer",
  ],
  authors: [{ name: "Rahul Chaurasiya" }],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-slate-900 text-slate-50 antialiased selection:bg-cyan-500 selection:text-white font-sans min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a href="#about" className="skip-link">Skip to main content</a>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
