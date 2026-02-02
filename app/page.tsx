import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardTitle } from "@/app/components/ui/card";
import { ArrowRight, Building2, Ticket, Globe } from "lucide-react";
import Link from "next/link";
import { HowItWorks } from "@/app/components/layout/HowItWorks";
import { Partners } from "@/app/components/layout/Partners";
import { FAQ } from "@/app/components/layout/FAQ";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-12 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now Live on BNB Chain
        </div>

        <h1 className="text-[85px] md:text-[120px] font-bold tracking-tighter text-white mb-8 font-heading uppercase leading-none">
          WELCOME HOME, <br />
          <span className="text-primary text-glow">ALPHA.</span>
        </h1>

        <p className="max-w-[520px] text-base text-white mb-12 leading-normal font-light">
          The Pride has arrived. Your status is recognized, your access is unlocked,
          and your territory is secured.
        </p>

        <div className="flex items-center flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/explore">
            <Button className="w-full sm:w-auto text-sm font-semibold group h-10 px-4 rounded-xl">
              Join The Pride
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="glass" className="w-full sm:w-auto text-sm h-10 px-4 rounded-xl">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Partners / Exchanges */}
      <Partners />

      {/* Features Grid (Seamless) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Building2 className="h-6 w-6 text-primary" />}
              title="Global Accommodations"
              description="Book stays at partner hotels worldwide directly with your tokens."
            />
            <FeatureCard
              icon={<Ticket className="h-6 w-6 text-primary" />}
              title="Exclusive Events"
              description="Get VIP access to concerts, conferences, and private parties."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-primary" />}
              title="Borderless Utility"
              description="No exchange fees. No banking delays. Instant real-world value."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="relative group overflow-hidden border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:border-primary/30">
      {/* Glow behind icon */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardContent className="pt-10 pb-8 flex flex-col items-center text-center relative z-10">
        <div className="mb-6 p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(247,147,26,0.3)] group-hover:border-primary/50 transition-all duration-300">
          <div className="text-gray-400 group-hover:text-primary transition-colors duration-300">
            {icon}
          </div>
        </div>
        <CardTitle className="mb-3 text-xl font-bold tracking-wide text-white group-hover:text-primary transition-colors">{title}</CardTitle>
        <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
