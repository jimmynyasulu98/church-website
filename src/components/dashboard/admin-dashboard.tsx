import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  Bell,
  CalendarDays,
  ChevronRight,
  Church,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPinned,
  Menu,
  Mic2,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import logo from "@/public/ccap_logo.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Members", icon: UsersRound },
  { label: "Mlaga Schedules", icon: CalendarDays },
  { label: "Events", icon: ClipboardList },
  { label: "Sermons", icon: Mic2 },
  { label: "Receipts", icon: Banknote },
  { label: "Ministries", icon: Church },
  { label: "News", icon: FileText },
  { label: "Users", icon: UserRound },
  { label: "Settings", icon: Settings },
  { label: "Reports", icon: ShieldCheck },
];

const stats = [
  {
    label: "Members",
    value: "1,245",
    trend: "+12 this month",
    icon: UsersRound,
    tone: "blue",
  },
  {
    label: "Districts",
    value: "6",
    trend: "Active",
    icon: MapPinned,
    tone: "indigo",
  },
  {
    label: "Ministries",
    value: "20",
    trend: "4 updated",
    icon: Church,
    tone: "emerald",
  },
  {
    label: "Mlaga This Week",
    value: "6",
    trend: "All districts",
    icon: CalendarDays,
    tone: "amber",
  },
  {
    label: "Receipts This Month",
    value: "MWK 2,450,000",
    trend: "85 verified",
    icon: CircleDollarSign,
    tone: "sky",
  },
];

const activities = [
  {
    title: "New receipt uploaded by Mrs. Phiri",
    detail: "Offering receipt awaiting verification",
    time: "2 mins ago",
    tone: "blue",
  },
  {
    title: "New sermon published",
    detail: "Walking by Faith added to latest sermons",
    time: "28 mins ago",
    tone: "slate",
  },
  {
    title: "Mlaga schedule updated",
    detail: "District 3 venue changed to Kadango",
    time: "1 hour ago",
    tone: "amber",
  },
  {
    title: "New member joined",
    detail: "Youth Conference 2026 registration approved",
    time: "4 hrs ago",
    tone: "emerald",
  },
  {
    title: "Receipt verified",
    detail: "Thanksgiving receipt approved by finance",
    time: "Today",
    tone: "emerald",
  },
];

const upcomingEvents = [
  {
    date: "18",
    month: "May",
    title: "Youth Conference 2026",
    time: "8:00 AM",
    venue: "Main Hall",
  },
  {
    date: "26",
    month: "May",
    title: "Women's Fellowship",
    time: "10:00 AM",
    venue: "Church Hall",
  },
  {
    date: "02",
    month: "Jun",
    title: "Communion Sunday",
    time: "All services",
    venue: "Sanctuary",
  },
];

const receiptBreakdown = [
  { label: "Tithes", value: "MWK 1,450,000", color: "bg-blue-600" },
  { label: "Offerings", value: "MWK 750,000", color: "bg-violet-500" },
  { label: "Pledges", value: "MWK 250,000", color: "bg-emerald-500" },
];

const toneClasses: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700",
  indigo: "bg-indigo-50 text-indigo-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  sky: "bg-sky-50 text-sky-700",
  slate: "bg-slate-100 text-slate-700",
};

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-primary text-white shadow-xl lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <Image src={logo} alt="CCAP Zomba logo" className="h-11 w-11 object-contain" />
          <div>
            <p className="text-sm font-black leading-tight">CCAP Zomba</p>
            <p className="text-[11px] font-semibold text-blue-100">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Dashboard">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                href="/dashboard"
                key={item.label}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${
                  item.active
                    ? "bg-accent text-white shadow-lg shadow-blue-950/20"
                    : "text-blue-50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold text-blue-50 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-primary lg:hidden"
                aria-label="Open dashboard menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Admin Dashboard
                </div>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-primary">
                  Overview
                </h1>
              </div>
            </div>

            <div className="hidden min-w-72 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search members, events or receipts"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-primary"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
              </button>
              <div className="hidden items-center gap-3 rounded-md border border-slate-200 px-3 py-2 sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-black text-white">
                  AD
                </span>
                <div>
                  <p className="text-sm font-black text-primary">Admin User</p>
                  <p className="text-xs font-semibold text-slate-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-md ${toneClasses[stat.tone]}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="mt-5 text-sm font-bold text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-primary">
                    {stat.value}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.9fr_0.95fr]">
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-primary">Recent Activities</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest updates across church operations.
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="hidden items-center gap-1 text-sm font-black text-accent sm:flex"
                >
                  View All
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {activities.map((activity) => (
                  <div key={activity.title} className="flex gap-3">
                    <span
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                        activity.tone === "emerald"
                          ? "bg-emerald-500"
                          : activity.tone === "amber"
                            ? "bg-amber-500"
                            : activity.tone === "blue"
                              ? "bg-blue-600"
                              : "bg-slate-400"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-black text-primary">{activity.title}</p>
                        <span className="text-xs font-bold text-slate-400">
                          {activity.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{activity.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-primary">Receipts Overview</h2>
              <p className="mt-1 text-sm text-slate-500">Giving distribution this month.</p>

              <div className="relative mx-auto mt-7 flex h-52 w-52 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#2563eb 0 59%, #8b5cf6 59% 90%, #10b981 90% 100%)",
                  }}
                />
                <div className="absolute inset-5 rounded-full bg-white" />
                <div className="relative text-center">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                    Total
                  </p>
                  <p className="mt-1 text-xl font-black text-primary">MWK 2.45M</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {receiptBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="text-sm font-black text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-primary">Upcoming Events</h2>
                  <p className="mt-1 text-sm text-slate-500">Next activities on calendar.</p>
                </div>
                <CalendarDays className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>

              <div className="mt-5 space-y-4">
                {upcomingEvents.map((event) => (
                  <article
                    key={event.title}
                    className="flex gap-4 rounded-md border border-slate-100 p-3"
                  >
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-blue-50 text-accent">
                      <span className="text-[11px] font-black uppercase">{event.month}</span>
                      <span className="text-lg font-black">{event.date}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-black text-primary">{event.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {event.time}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-400">{event.venue}</p>
                    </div>
                  </article>
                ))}
              </div>

              <Link
                href="/dashboard"
                className="mt-5 flex items-center justify-center gap-2 rounded-md bg-blue-50 px-4 py-3 text-sm font-black text-accent transition hover:bg-accent hover:text-white"
              >
                View All Events
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-primary">District Summary</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["District 1", "District 2", "District 3", "District 4", "District 5", "District 6"].map(
                  (district, index) => (
                    <div key={district} className="rounded-md bg-slate-50 p-4">
                      <p className="text-sm font-black text-primary">{district}</p>
                      <p className="mt-2 text-2xl font-black text-accent">
                        {218 - index * 13}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-500">members</p>
                    </div>
                  ),
                )}
              </div>
            </article>

            <article className="rounded-md border border-slate-200 bg-primary p-5 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-black">Pending Office Tasks</h2>
                  <p className="text-sm text-blue-100">Items needing attention today.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {["12 receipt approvals", "4 join requests", "2 contact messages"].map(
                  (task) => (
                    <div
                      key={task}
                      className="flex items-center justify-between rounded-md bg-white/10 px-4 py-3 text-sm font-bold"
                    >
                      {task}
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  ),
                )}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
