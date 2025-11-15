"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent border border-border">
              <span className="text-xs sm:text-sm font-medium text-foreground">Ramp faster. Retain longer.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Your new hire&apos;s first{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                60 days
              </span>
              , done right.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              Transform onboarding from paperwork chaos into a strategic advantage. Help new hires ramp 25% faster while proving HR&apos;s impact to leadership.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/admin/setup">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-warm opacity-20 blur-3xl"></div>
            <Image
              src="/hero-onboarding.jpg"
              alt="Team collaborating on onboarding"
              width={800}
              height={600}
              className="relative rounded-2xl shadow-medium w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
