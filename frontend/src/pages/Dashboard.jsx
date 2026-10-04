import React from "react";
import {
  LayoutDashboard,
  Wrench,
  FolderKanban,
  Star,
  History,
  Settings,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Tools Used",
    value: "0",
    icon: Wrench,
  },
  {
    title: "Projects",
    value: "0",
    icon: FolderKanban,
  },
  {
    title: "Favorites",
    value: "0",
    icon: Star,
  },
  {
    title: "History",
    value: "0",
    icon: History,
  },
];

const quickTools = [
  {
    name: "Image Compressor",
    description: "Compress images quickly without losing quality.",
    path: "/tools",
  },
  {
    name: "PDF Merger",
    description: "Merge multiple PDF files into one document.",
    path: "/tools",
  },
  {
    name: "Word Counter",
    description: "Count words, characters and sentences.",
    path: "/tools",
  },
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data easily.",
    path: "/tools",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Welcome back to WorkZone
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
                    <Icon size={20} />
                  </div>
                </div>

                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Quick Tools */}
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Quick Tools
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Start working with your favorite freelancer tools.
              </p>
            </div>

            <a
              href="/tools"
              className="hidden items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 sm:flex"
            >
              View all
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.path}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-blue-500"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <Wrench size={20} />
                </div>

                <h3 className="font-semibold">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-blue-400">
                  Open tool
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center gap-3">
              <History size={20} className="text-blue-400" />

              <div>
                <h2 className="font-semibold">
                  Recent Activity
                </h2>

                <p className="text-sm text-slate-400">
                  Your recent tool activity will appear here.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
              <p className="text-sm text-slate-400">
                No activity yet.
              </p>

              <a
                href="/tools"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-400"
              >
                Explore tools
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center gap-3">
              <Settings size={20} className="text-blue-400" />

              <div>
                <h2 className="font-semibold">
                  Account
                </h2>

                <p className="text-sm text-slate-400">
                  Manage your WorkZone account.
                </p>
              </div>
            </div>

            <a
              href="/settings"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium transition hover:bg-blue-500"
            >
              Account Settings
              <ArrowRight size={16} />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
