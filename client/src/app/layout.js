import { Sora } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const sora = Sora({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Rahul Chaurasiya | Full Stack Developer (MERN Stack) Portfolio",
  description:
    "Official Personal Portfolio of Rahul Chaurasiya — Full Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, RESTful APIs, and AI Applications like AI Study Assistant & AI Resume Analyzer.",
  keywords: [
    "Rahul Chaurasiya",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Portfolio",
    "AI Study Assistant",
    "AI Resume Analyzer",
    "Float Chat",
    "Unified MCM Portal",
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
    <html lang="en" className={`${sora.variable} scroll-smooth dark`}>
      <body className="bg-slate-900 text-slate-50 antialiased selection:bg-cyan-500 selection:text-white font-sans min-h-screen">
        <a href="#about" className="skip-link">Skip to main content</a>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
