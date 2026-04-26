"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import clsx from "clsx";
import {
  Bell,
  CalendarDays,
  ChartBar,
  FolderKanban,
  BookMarked,
  Handshake,
  Landmark,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  School,
  Search,
  Settings,
  Users,
  UserSquare2,
  X,
  Hotel,
  BookOpenText,
  BookCheck,
  Cctv,
  Wallet,
  HousePlus,
  UserPlus,
  ChartPie,
} from "lucide-react";
import { usePathname } from "next/navigation";

const schoolNavigation = [
  { label: "Dashboard", href: "/school/dashboard", icon: LayoutDashboard },
  {
    label: "Students Management",
    icon: Users,
    group: [
      { label: "Students", href: "/school/students", icon: Users },
      { label: "Enroll Student", href: "/school/students/add", icon: UserPlus },
      { label: "Parents", href: "/school/parent", icon: Handshake },
      { label: "Add Parent", href: "/school/parent/add", icon: UserPlus },
    ],
  },
  {
    label: "Staff Management",
    icon: UserSquare2,
    group: [
      { label: "Staff", href: "/school/staff", icon: UserSquare2 },
      { label: "Add Staff", href: "/school/staff/add", icon: UserPlus },
      {
        label: "Attendance",
        href: "/school/staff/attendance",
        icon: ClipboardCheck,
      },
      { label: "Analytics", href: "/school/staff/analytics", icon: ChartPie },
    ],
  },
  {
    label: "Academic Management",
    icon: BookOpenText,
    group: [
      { label: "Classes", href: "/school/classes", icon: GraduationCap },
      { label: "Subjects", href: "/school/subjects", icon: BookOpenText },
      { label: "Examination", href: "/school/examination", icon: BookCheck },
      { label: "Results", href: "/school/results", icon: BookMarked },
      { label: "Schedules", href: "/school/schedule", icon: CalendarDays },
      { label: "Committees", href: "/school/committee", icon: Users },
    ],
  },
  {
    label: "Hostels Management",
    icon: Hotel,
    group: [
      { label: "Hostels", href: "/school/hostel", icon: Hotel },
      {
        label: "Assign Student",
        href: "/school/hostel/assign",
        icon: UserPlus,
      },
      { label: "Add Room", href: "/school/hostel/add", icon: HousePlus },
    ],
  },
  {
    label: "Financial Management",
    icon: CircleDollarSign,
    group: [
      { label: "Account", href: "/school/wallet", icon: Wallet },
      { label: "Expenses", href: "/school/expenses", icon: Landmark },
      { label: "Fees", href: "/school/fees", icon: CircleDollarSign },
    ],
  },
  {
    label: "Analytics",
    icon: ChartPie,
    group: [
      {
        label: "Student Performance",
        href: "/school/analytics/student",
        icon: ChartBar,
      },
      { label: "Parent Engagement", href: "/school/analytics/parent", icon: ChartBar },
      { label: "Staff Performance", href: "/school/analytics/staff", icon: ChartBar },
      {
        label: "Financial Analytics",
        href: "/school/analytics/financial",
        icon: ChartBar,
      },
    ],
  },
  {
    label: "E-Learning",
    icon: Cctv,
    group: [
      {
        label: "Virtual Classes",
        href: "/school/e-learning/virtual",
        icon: ClipboardCheck,
      },
      { label: "Libraries", href: "/school/e-learning/libraries", icon: Cctv },
    ],
  },
  {
    label: "Access Control",
    icon: Cctv,
    group: [
      { label: "Attendance", href: "/school/attendance", icon: ClipboardCheck },
      { label: "Feed", href: "/school/feed", icon: Cctv },
    ],
  },
  { label: "Reports", href: "/school/report", icon: ChartBar },
  { label: "Drive", href: "/school/drive", icon: FolderKanban },
  { label: "Settings", href: "/school/settings", icon: Settings },
];

const notifications = [
  {
    id: "1",
    title: "New student registration",
    message: "3 applications were submitted this morning.",
    time: "5m ago",
  },
  {
    id: "2",
    title: "Attendance update",
    message: "JSS 2 Ruby attendance dropped below 85%.",
    time: "18m ago",
  },
  {
    id: "3",
    title: "Result publishing reminder",
    message: "Science department deadline is tomorrow.",
    time: "1h ago",
  },
];

function getPageTitle(pathname: string) {
  const fallback = "School Management";
  const current = schoolNavigation.find(
    (item) => item?.href && pathname.startsWith(item.href),
  );

  return current ? current.label : fallback;
}

export function SchoolShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [parent, setParent] = useState<string>("");
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <div className="relative mx-auto h-screen max-w-[1540px]">
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto border-r border-default-200/70 bg-background/96 p-5 shadow-xl backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between gap-2 border border-emerald-700 rounded-2xl px-3 py-3 sticky top-0 bg-white/95 mb-5 z-10">
            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-2 text-emerald-700 dark:text-emerald-300">
                <School size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                  FUS - DTP
                </p>
                <p className="text-sm font-semibold">School Portal</p>
              </div>
            </div>
            <Button
              isIconOnly
              className="lg:hidden"
              radius="full"
              size="sm"
              variant="light"
              onPress={() => setIsSidebarOpen(false)}
            >
              <X size={17} />
            </Button>
          </div>

          <nav className="mt-6 space-y-1.5">
            {schoolNavigation.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                item.group?.some((sub) => pathname === sub.href);

              if (!item.group) {
                return (
                  <Link
                    key={item.href}
                    className={clsx(
                      "flex items-center justify-between rounded-2xl border px-3 py-3 text-sm transition-colors",
                      active
                        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "border-transparent text-foreground/80 hover:border-default-200/80 hover:bg-default-100/70",
                    )}
                    href={item.href}
                    onPress={() => setIsSidebarOpen(false)}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={16} />
                      {item.label}
                    </span>
                    {active ? (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    ) : null}
                  </Link>
                );
              } else {
                return (
                  <div key={item.label} className="space-y-1">
                    <Button
                      key={item.label}
                      className={clsx(
                        "w-full flex items-center justify-between rounded-2xl border px-3 py-5.5 text-sm transition-colors",
                        active
                          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-transparent text-foreground/80 hover:border-default-200/80 hover:bg-default-100/70",
                      )}
                      variant="light"
                      onPress={() => {
                        setIsSidebarOpen(false);
                        setParent((prev: string) =>
                          prev === item.label ? "" : item.label,
                        );
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={16} />
                        {item.label}
                      </span>
                      {active ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      ) : null}
                    </Button>
                    {parent === item.label && (
                      <div className="space-y-1 p-3 rounded-2xl border border-emerald-500/20 bg-emerald-50/65 dark:border-emerald-400/20 dark:bg-emerald-900/15">
                        {item.group.map((sub) => {
                          const SubIcon = sub.icon;
                          const subActive = pathname === sub.href;

                          return (
                            <Link
                              key={sub.href}
                              className={clsx(
                                "flex items-center justify-between rounded-2xl border px-3 py-3 text-sm transition-colors",
                                subActive
                                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                  : "border-transparent text-foreground/80 hover:border-default-200/80 hover:bg-default-100/70",
                              )}
                              href={sub.href}
                              onPress={() => setIsSidebarOpen(false)}
                            >
                              <span className="flex items-center gap-2.5">
                                <SubIcon size={16} />
                                {sub.label}
                              </span>
                              {subActive ? (
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-50/65 p-4 dark:border-emerald-400/20 dark:bg-emerald-900/15">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
              Term Focus
            </p>
            <p className="mt-2 text-sm font-semibold">
              Mid-term Academic Review
            </p>
            <p className="mt-1 text-xs leading-5 text-foreground/70">
              Ensure class teachers finalize continuous assessment entries
              before Friday.
            </p>
          </div>
        </aside>

        <div className="relative flex h-screen min-w-0 flex-col lg:ml-[280px]">
          <header className="z-40 shrink-0 border-b border-default-200/70 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  className="lg:hidden"
                  radius="full"
                  variant="light"
                  onPress={() => setIsSidebarOpen(true)}
                >
                  <Menu size={18} />
                </Button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                    Student Management System
                  </p>
                  <h1 className="text-xl font-semibold">{pageTitle}</h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Input
                  className="w-[240px]"
                  placeholder="Search students, staff, classes"
                  radius="full"
                  startContent={
                    <Search className="text-foreground/45" size={16} />
                  }
                />
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" variant="bordered">
                      <span className="relative inline-flex">
                        <Bell size={17} />
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-600" />
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Notifications"
                    className="max-w-[320px]"
                    variant="flat"
                  >
                    {notifications.map((item) => (
                      <DropdownItem
                        key={item.id}
                        className="whitespace-normal"
                        description={item.message}
                        endContent={
                          <span className="text-xs text-foreground/50">
                            {item.time}
                          </span>
                        }
                      >
                        {item.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown placement="bottom-start">
                  <DropdownTrigger>
                    <Avatar
                      showFallback
                      as={Button}
                      className="h-9 w-9"
                      isIconOnly={true}
                      name="HC"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem key="school">School</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-2 py-2 sm:px-4 md:px-6">
            {children}
          </main>
        </div>
      </div>

      {isSidebarOpen ? (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"
          type="button"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}
