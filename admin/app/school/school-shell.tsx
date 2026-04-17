"use client";

import { useMemo, useState } from "react";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
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
    BookCheck
} from "lucide-react";
import { usePathname } from "next/navigation";

const schoolNavigation = [
    { label: "Dashboard", href: "/school/dashboard", icon: LayoutDashboard },
    { label: "Students", href: "/school/students", icon: Users },
    { label: "Staffs", href: "/school/staff", icon: UserSquare2 },
    { label: "Attendance", href: "/school/attendance", icon: ClipboardCheck },
    { label: "Classes", href: "/school/classes", icon: GraduationCap },
    { label: "Hostels", href: "/school/hostel", icon: Hotel },
    { label: "Results", href: "/school/results", icon: BookMarked },
    { label: "Fees", href: "/school/fees", icon: CircleDollarSign },
    { label: "Reports", href: "/school/report", icon: ChartBar },
    { label: "Parents", href: "/school/parent", icon: Handshake },
    { label: "Schedules", href: "/school/schedule", icon: CalendarDays },
    { label: "Subjects", href: "/school/subjects", icon: BookOpenText },
    { label: "Examination", href: "/school/examination", icon: BookCheck },
    { label: "Expenses", href: "/school/expenses", icon: Landmark },
    { label: "Committees", href: "/school/committee", icon: Users },
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
    const current = schoolNavigation.find((item) => pathname.startsWith(item.href));

    return current ? current.label : fallback;
}

export function SchoolShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">FUS - DTP</p>
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
                            const active = pathname === item.href;

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
                                    {active ? <span className="h-2 w-2 rounded-full bg-emerald-500" /> : null}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-50/65 p-4 dark:border-emerald-400/20 dark:bg-emerald-900/15">
                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Term Focus</p>
                        <p className="mt-2 text-sm font-semibold">Mid-term Academic Review</p>
                        <p className="mt-1 text-xs leading-5 text-foreground/70">
                            Ensure class teachers finalize continuous assessment entries before Friday.
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
                                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Student Management System</p>
                                    <h1 className="text-xl font-semibold">{pageTitle}</h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Input
                                    className="w-[240px]"
                                    placeholder="Search students, staff, classes"
                                    radius="full"
                                    startContent={<Search className="text-foreground/45" size={16} />}
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
                                    <DropdownMenu aria-label="Notifications" className="max-w-[320px]" variant="flat">
                                        {notifications.map((item) => (
                                            <DropdownItem
                                                key={item.id}
                                                className="whitespace-normal"
                                                description={item.message}
                                                endContent={<span className="text-xs text-foreground/50">{item.time}</span>}
                                            >
                                                {item.title}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown placement="bottom-start">
                                    <DropdownTrigger>
                                        <Avatar
                                            as={Button}
                                            className="h-9 w-9"
                                            name="HC"
                                            showFallback
                                            isIconOnly={true}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="User Actions" variant="flat">
                                        <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-bold">Signed in as</p>
                                            <p className="font-bold">@tonyreichert</p>
                                        </DropdownItem>
                                        <DropdownItem key="school">School</DropdownItem>
                                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                        <DropdownItem key="logout" color="danger">
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </header>

                    <main className="min-h-0 flex-1 overflow-y-auto px-2 py-2 sm:px-4 md:px-6">{children}</main>
                </div>
            </div>

            {isSidebarOpen ? (
                <button
                    aria-label="Close sidebar overlay"
                    className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    type="button"
                />
            ) : null}
        </div>
    );
}