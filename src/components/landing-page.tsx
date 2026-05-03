"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  Church,
  Gift,
  HandHeart,
  MapPin,
  Play,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const serviceTimes = [
  { title: "Chichewa Service", time: "6:00 AM - 8:00 AM", icon: Church },
  { title: "English Service", time: "8:00 AM - 10:00 AM", icon: CalendarDays },
  { title: "Chichewa Service", time: "10:00 AM - 12:00 PM", icon: Church },
];

const pillars = [
  {
    title: "Worship",
    text: "Spirit-filled worship in Chichewa and English services.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
    icon: CalendarDays,
  },
  {
    title: "Grow",
    text: "Grow in the Word through teaching, fellowship and prayer.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80",
    icon: Users,
  },
  {
    title: "Connect",
    text: "We believe in community. Join a ministry or a district near you.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    icon: HandHeart,
  },
  {
    title: "Give",
    text: "Support the work of God through tithes, offering and pledges.",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80",
    icon: Gift,
  },
];

const mlagaItems = [
  {
    name: "District 1",
    host: "Mr. Banda",
    preacher: "Elder Phiri",
    date: "Wed, 15 May 2024",
    time: "6:00 PM",
    location: "Chinamwali",
  },
  {
    name: "District 2",
    host: "Mrs. Kachale",
    preacher: "Elder Chirimwemwe",
    date: "Wed, 15 May 2024",
    time: "6:00 PM",
    location: "Chipembere",
  },
  {
    name: "District 3",
    host: "Mr. Jere",
    preacher: "Deaconess Thoko",
    date: "Wed, 15 May 2024",
    time: "6:00 PM",
    location: "Kadango",
  },
];

const events = [
  {
    month: "MAY",
    day: "18",
    title: "Youth Conference 2024",
    detail: "18 May 2024 - 20 May 2024",
    place: "CCAP Zomba Main Hall",
  },
  {
    month: "MAY",
    day: "26",
    title: "Women's Fellowship",
    detail: "26 May 2024 - 10:00 AM",
    place: "District 2",
  },
  {
    month: "JUN",
    day: "02",
    title: "Communion Sunday",
    detail: "02 June 2024 - All Services",
    place: "CCAP Zomba",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-extrabold uppercase tracking-tight text-primary">
          {title}
        </h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
      </div>
      {action ? (
        <Link
          href="#home"
          className="text-sm font-bold text-primary transition hover:text-accent"
        >
          {action} →
        </Link>
      ) : null}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="bg-white text-primary">
      <section
        id="home"
        className="relative overflow-hidden bg-cover bg-center text-white lg:min-h-[690px]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2200&q=85)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/58 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-40 lg:px-8 lg:pt-32">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12 }}
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Welcome to
              <br />
              Zomba CCAP 
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-xl font-bold text-white/95"
            >
              A Christ-centered community in Zomba
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <p className="mb-4 text-sm font-extrabold uppercase tracking-wide">
                Service Times
              </p>
              <div className="grid max-w-4xl overflow-hidden rounded-md bg-white text-primary shadow-xl sm:grid-cols-3">
                {serviceTimes.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={`${service.title}-${service.time}`}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 sm:px-6 sm:py-4",
                        index > 0 && "border-t border-slate-200 sm:border-l sm:border-t-0",
                      )}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-accent">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-extrabold">
                          {service.title}
                        </span>
                        <span className="text-sm text-slate-700">
                          {service.time}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4"
            >
              <Button asChild className="h-14 w-full rounded-sm bg-accent sm:w-auto sm:min-w-48">
                <Link href="#new-here">Plan a Visit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 w-full rounded-sm border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto sm:min-w-48"
              >
                <Link href="#sermons">Watch Sermons</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
        className="relative z-10 mx-auto mt-8 max-w-6xl px-4 sm:-mt-24 sm:px-6 lg:px-8"
      >
        <div className="grid gap-5 rounded-xl bg-white p-4 shadow-2xl shadow-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-md border border-slate-200 bg-white transition hover:shadow-lg"
              >
                <div
                  className="h-36 bg-cover bg-center transition duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${pillar.image})` }}
                />
                <div className="relative p-6 pt-10">
                  <span className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-extrabold">{pillar.title}</h3>
                  <p className="mt-3 min-h-20 text-base leading-6 text-slate-700">
                    {pillar.text}
                  </p>
                  <Link
                    href="#new-here"
                    className="mt-5 inline-flex text-sm font-bold text-accent"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        id="new-here"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="grid overflow-hidden rounded-xl bg-primary md:grid-cols-[0.38fr_0.62fr]"
        >
          <div className="p-10 text-white lg:p-16">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-100">
              New Here?
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight">
              We’d love to
              <br />
              meet you!
            </h2>
            <p className="mt-6 leading-7 text-blue-50">
              CCAP Zomba is a family where you can belong before you believe.
              Join us this Sunday and experience God’s love.
            </p>
            <Button asChild className="mt-8 rounded-sm bg-accent">
              <Link href="#contact">Learn More</Link>
            </Button>
          </div>
          <div
            className="min-h-[360px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1300&q=80)",
            }}
          />
        </motion.div>
      </motion.section>

      <motion.section
        id="minister-message"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-100 lg:grid-cols-[0.42fr_0.58fr]"
        >
          <div
            className="min-h-[360px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80)",
            }}
            aria-label="Main reverend portrait placeholder"
          />
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="mb-5 h-1 w-14 rounded-full bg-accent" />
            <p className="text-sm font-extrabold uppercase tracking-wide text-accent">
              Message from the Main Reverend
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-primary sm:text-4xl">
              A warm welcome to CCAP Zomba.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              We are grateful that you are here. Our prayer is that every person
              who comes to CCAP Zomba will encounter Christ, find a caring
              family, and grow in faith through worship, fellowship,
              discipleship, and service.
            </p>
            <div className="mt-8 border-l-4 border-accent pl-5">
              <p className="text-xl font-black text-primary">Rev. John Phiri</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-slate-500">
                Main Reverend, CCAP Zomba
              </p>
            </div>
            <Button asChild className="mt-8 rounded-sm bg-accent">
              <Link href="#contact">Read Full Message</Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ staggerChildren: 0.12 }}
        className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8"
      >
        <motion.div id="sermons" variants={fadeUp}>
          <SectionHeader title="Today's Sermon" />
          <div className="overflow-hidden rounded-md">
            <div
              className="group relative h-44 overflow-hidden rounded-md bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80)",
              }}
            >
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent transition group-hover:scale-110">
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </span>
              </div>
            </div>
          </div>
          <h3 className="mt-5 text-2xl font-extrabold">Walking by Faith</h3>
          <p className="mt-2 text-base text-slate-700">2 Corinthians 5:7</p>
          <p className="mt-3 text-sm font-bold">Rev. John Phiri</p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="rounded-sm">
              <Link href="#sermons">Watch Now</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="#sermons">Sermon Notes</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          id="mlaga"
          variants={fadeUp}
          className="border-y border-slate-200 py-8 lg:border-x lg:border-y-0 lg:px-8 lg:py-0"
        >
          <SectionHeader title="This Week's Mlaga" action="View All Schedules" />
          <div className="space-y-5">
            {mlagaItems.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-[auto_1fr_auto] gap-4 border-b border-slate-200 pb-5 last:border-b-0"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-accent">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-extrabold">{item.name}</h3>
                  <p className="text-sm text-slate-700">
                    <span className="font-bold text-accent">Host:</span>{" "}
                    {item.host}
                  </p>
                  <p className="text-sm text-slate-700">
                    <span className="font-bold text-accent">Preacher:</span>{" "}
                    {item.preacher}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold">{item.date}</p>
                  <p className="mt-1 text-slate-700">{item.time}</p>
                  <p className="mt-1 flex items-center justify-end gap-1 text-slate-700">
                    {item.location}
                    <MapPin className="h-3 w-3 text-red-500" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="#mlaga"
            className="mt-6 block text-center text-sm font-bold text-accent"
          >
            View All Districts →
          </Link>
        </motion.div>

        <motion.div id="events" variants={fadeUp}>
          <SectionHeader title="Upcoming Events" action="View All Events" />
          <div className="space-y-5">
            {events.map((event) => (
              <div
                key={event.title}
                className="grid grid-cols-[74px_1fr] gap-5 border-b border-slate-200 pb-5 last:border-b-0"
              >
                <div className="rounded-md border border-slate-300 bg-white py-3 text-center">
                  <p className="text-sm font-extrabold text-accent">{event.month}</p>
                  <p className="text-3xl font-black">{event.day}</p>
                </div>
                <div>
                  <h3 className="font-extrabold text-accent">{event.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{event.detail}</p>
                  <p className="mt-1 text-sm text-slate-700">{event.place}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        id="giving"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="overflow-hidden rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(11,31,58,0.98) 0%, rgba(11,31,58,0.86) 42%, rgba(11,31,58,0.18) 100%), url(https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1600&q=80)",
          }}
        >
          <div className="max-w-xl px-10 py-12 text-white lg:px-16">
            <div className="mb-5 h-1 w-16 rounded-full bg-white" />
            <h2 className="text-4xl font-black">Support the work of God</h2>
            <p className="mt-5 leading-7 text-blue-50">
              You can give your tithes and offerings securely through the bank
              or upload your receipt online.
            </p>
            <Button asChild className="mt-8 rounded-sm bg-accent">
              <Link href="/giving">Give / Upload Receipt</Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
