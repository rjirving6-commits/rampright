"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border">
              <span className="text-sm font-medium text-foreground">Ramp faster. Retain longer.</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Your new hire&apos;s first{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                90 days
              </span>
              , done right.
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
              Transform onboarding from paperwork chaos into a strategic advantage. Help new hires ramp 25% faster while proving HR&apos;s impact to leadership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-success" size={20} />
                <span className="text-sm text-muted-foreground">25% faster ramp time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-success" size={20} />
                <span className="text-sm text-muted-foreground">10% better retention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-success" size={20} />
                <span className="text-sm text-muted-foreground">90% completion rate</span>
              </div>
            </div>
          </div>

          <div className="relative">
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
