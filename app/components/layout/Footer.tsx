import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-24 md:pb-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Column (Left - 6 cols) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold tracking-tighter uppercase font-heading">
                <span className="text-primary">ALPHA</span> <span className="text-white">PRIDE</span>
              </h1>
            </Link>

            <div className="space-y-6 text-sm text-gray-500 max-w-md leading-relaxed">
              <p>
                Alpha is built on unity, strength, and belonging. Every holder becomes part
                of a hierarchy where dominance is respected and access is the ultimate reward.
              </p>
              <p>
                $ALPHA is a community-driven project created for cultural and
                entertainment purposes. It does not represent equity or legal claims.
                Access to groups is a privilege tied to holdings, not a financial guarantee.
              </p>
            </div>
          </div>

          {/* Links Columns (Middle - 4 cols total) */}
          <div className="md:col-span-6 lg:col-span-2 space-y-6">
            <h3 className="text-white font-bold text-lg">Resources</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-primary transition-colors">Whitepaper</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contract</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-2 space-y-6">
            <h3 className="text-white font-bold text-lg">Community</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-primary transition-colors">Telegram</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Twitter/X</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Linkedin</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">TikTok</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Snapchat</Link></li>
            </ul>
          </div>

          {/* Copyright (Right - 3 cols) */}
          <div className="md:col-span-12 lg:col-span-3 lg:text-right">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Alpha Pride. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Message Bot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-primary text-black font-bold rounded-full h-10 px-4 shadow-[0_0_20px_rgba(255,153,0,0.5)] hover:shadow-[0_0_30px_rgba(255,153,0,0.7)] hover:bg-primary/90 transition-all text-sm"
        >
          Message TheAlphaPride Bot
        </Button>
      </div>
    </footer>
  );
}
