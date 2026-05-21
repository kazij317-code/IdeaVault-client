import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { ThemeProvider } from '@/components/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const josefin = Josefin_Sans({
//   // variable: "--font-geist-sans",
//   subsets: ["latin"],
// });





const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "IdeaVault",
    template: "%s | IdeaVault",
  },
  description: "Share and validate your startup ideas.",
};

export default function RootLayout({ children }) {
  return (
    // <html
    //   lang="en"
    //   // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      
    //   className={`${josefin.className} h-full antialiased light`}
    //   data-theme="light"
    //   suppressHydrationWarning
    // >
      
    //   <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        
    //     <Navbar/>
        
    //     <main className="grow">{children}</main>
    //     <Footer/>
    //     <Toaster />
        
    //   </body>
    // </html>

    // --------------
<html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
      suppressHydrationWarning
    >
      
      {/* <body className="min-h-full flex flex-col bg-slate-50 text-slate-900"> */}
      
      {/* bg-slate-50 text-slate-900 (Used when light mode is active)
        dark:bg-[#0b0f19] dark:text-slate-100 (Used when dark mode is active)
      */}
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
        <Navbar/>
        
        <main className="grow">{children}</main>
        <Footer/>
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
    // -----------------
  );
}


// -----------------------------------
// import { Josefin_Sans } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import { Toaster } from "react-hot-toast";
// import Footer from "@/components/Footer";
// import { ThemeProvider } from '@/components/ThemeProvider';

// const josefin = Josefin_Sans({
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "IdeaVault - Share & Validate Startup Ideas",
//   description: "A platform to share, validate, and refine innovative startup ideas with the community.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html
//       lang="en"
//       className={`${josefin.className} h-full antialiased`}
//       suppressHydrationWarning {/* 👈 Keeps things silent during hydration translation */}
//     >
//       {/* Tailwind v4 handles background colors natively with theme changes.
//         We change bg-slate-50 to dark:bg-[#0b0f19] and text-slate-900 to dark:text-slate-100 
//       */}
//       <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors duration-300">
        
//         <ThemeProvider> {/* 👈 Provides global theme context to your entire app */}
//           <Navbar />
          
//           <main className="grow">
//             {children}
//           </main>
          
//           <Footer />
//           <Toaster />
//         </ThemeProvider>

//       </body>
//     </html>
//   );
// }





// -----------------------------------
