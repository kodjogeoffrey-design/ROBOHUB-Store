import React from "react";
import { Link } from "react-router-dom";
import { Cpu, GraduationCap, Wrench, Heart, ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppLink, splitStoreTagline } from "@/lib/config";
import { getSettings } from "@/lib/settings";

const values = [
  { icon: GraduationCap, t: "We're students too", d: "ROBOHUB started as a handful of engineering students who got tired of waiting weeks for parts and paying import markups." },
  { icon: Wrench, t: "We build with what we sell", d: "Every board, sensor, and motor on this store has been used in one of our own club projects first. If it didn't work for us, it's not on the shelf." },
  { icon: Heart, t: "Makers over margins", d: "We're not trying to be a giant retailer. We keep prices honest so more students can afford to build their first robot." },
];

export default function About() {
  const [tagHead, tagSub] = splitStoreTagline(getSettings().tagline);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 pcb-grid opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center">
          <span className="font-mono-tech text-[11px] uppercase tracking-widest text-accent">
            <span className="led-blink mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" /> About ROBOHUB
          </span>
          <h1 className="mt-4 font-heading text-4xl font-700 leading-tight md:text-5xl">
            {tagHead}
            {tagSub && (
              <>
                <br />
                <span className="text-primary">{tagSub}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            ROBOHUB is a rising, student-run STEM collective — not official yet, but serious about
            the work. The store is one branch of it: a way to get real components into the hands of
            students across Ghana without the wait or the markup.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="font-mono-tech text-[11px] uppercase tracking-widest text-accent">▸ The story</p>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              It started the way most good things do — frustration. A group of us wanted to build a
              line-following robot for a competition, and we spent more time chasing down parts than
              actually building. Boards arrived late, sensors were fake, and the "starter kit" we
              ordered online was missing half the pieces.
            </p>
            <p>
              So we started sourcing our own. We tested everything in our own projects, figured out
              what actually worked, and started lending parts to classmates. That turned into a small
              shelf, then a WhatsApp group, and now this store.
            </p>
            <p>
              ROBOHUB isn't a company yet — it's a student group with a mission: make it possible for
              any student in Ghana to go from an idea to a working build in a weekend, with parts they
              can trust and support that actually replies.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="font-heading text-2xl font-700">What we stand for</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="rounded-sm border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-sm border border-primary/30 bg-primary/10">
                  <v.icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-600">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pcb-grid-fine opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 text-center">
          <Cpu className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 font-heading text-3xl font-700">Want to build with us?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Whether you need a single sensor or parts for a whole class, message us — we'll help you spec it out.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={buildWhatsAppLink("Hi ROBOHUB, I'd like to know more about your store and components.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-mono-tech text-xs font-700 uppercase tracking-wider text-primary-foreground solder-pulse"
            >
              <MessageCircle className="h-4 w-4" /> Message us
            </a>
            <Link to="/shop" className="flex items-center gap-2 rounded-sm border border-border bg-card px-5 py-3 font-mono-tech text-xs font-600 uppercase tracking-wider">
              Browse the store <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}