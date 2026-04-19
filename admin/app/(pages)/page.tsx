import Image from "next/image";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ChartLine,
  CircleAlert,
  ClipboardCheck,
  Coins,
  Eye,
  GraduationCap,
  Landmark,
  LogIn,
  Mail,
  MessageSquare,
  Phone,
  School,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const challenges = [
  {
    text: "Independent school operations with little centralized digital coordination",
    icon: Building2,
  },
  {
    text: "Manual, fragmented processes across admissions, academics, and administration",
    icon: ClipboardCheck,
  },
  {
    text: "Limited transparency in fee collection and financial processes",
    icon: Coins,
  },
  {
    text: "No single national platform for real-time enrollment and performance monitoring",
    icon: Eye,
  },
  {
    text: "Low utilization of existing ICT assets due to poor integration",
    icon: CircleAlert,
  },
];

const modules = [
  {
    number: "01",
    title: "Admission and Student Lifecycle",
    text: "Digitize registration, admission ranking, automated letters, identity cards, and student records from entry to graduation.",
    icon: Users,
    className:
      "md:col-span-2 border-emerald-500/20 bg-[linear-gradient(140deg,rgba(6,182,212,0.16),rgba(14,165,233,0.08),rgba(255,255,255,0.86))] dark:bg-[linear-gradient(140deg,rgba(8,47,73,0.88),rgba(14,116,144,0.52),rgba(15,23,42,0.92))]",
  },
  {
    number: "02",
    title: "Academic and Learning Operations",
    text: "Manage class schedules, subjects, assessments, examinations, assignments, digital learning materials, and performance analytics.",
    icon: BookOpen,
    className:
      "border-orange-500/20 bg-[linear-gradient(145deg,rgba(251,146,60,0.16),rgba(255,255,255,0.88))] dark:bg-[linear-gradient(145deg,rgba(120,53,15,0.78),rgba(15,23,42,0.92))]",
  },
  {
    number: "03",
    title: "Staff and HR Management",
    text: "Centralize staff records, attendance, recruitment, training and certification, performance indicators, and evaluations.",
    icon: Briefcase,
    className:
      "border-emerald-500/20 bg-[linear-gradient(145deg,rgba(16,185,129,0.16),rgba(255,255,255,0.88))] dark:bg-[linear-gradient(145deg,rgba(6,78,59,0.82),rgba(15,23,42,0.92))]",
  },
  {
    number: "04",
    title: "Finance, Boarding, and Parent Engagement",
    text: "Run fee management, PTA levies, payment gateway and treasury integration, hostel allocation, visitor logs, and parent communication.",
    icon: Landmark,
    className:
      "md:col-span-2 border-violet-500/20 bg-[linear-gradient(145deg,rgba(125,211,252,0.10),rgba(244,114,182,0.10),rgba(255,255,255,0.88))] dark:bg-[linear-gradient(145deg,rgba(49,46,129,0.68),rgba(15,23,42,0.94))]",
  },
];

const metrics = [
  { value: "98%", label: "attendance accuracy", icon: ClipboardCheck },
  { value: "24/7", label: "parent portal access", icon: MessageSquare },
  { value: "3x", label: "faster result publishing", icon: ChartLine },
  { value: "120+", label: "schools onboarded", icon: School },
];

const pillars = [
  {
    title: "National visibility",
    text: "A centralized education management model gives the Ministry real-time visibility across all Unity Schools.",
  },
  {
    title: "Data-driven decisions",
    text: "Unified analytics supports planning on enrollment, teacher performance, infrastructure usage, and budget utilization.",
  },
  {
    title: "Future-ready architecture",
    text: "Cloud-based rollout with deployment, integration, training, and optimization phases supports long-term scalability.",
  },
];

const timelinePhases = [
  {
    phase: "Week 1-4",
    title: "Familiarization, documentation, and planning",
    text: "Stakeholder alignment, process mapping, technical baseline, and implementation workplan for all Unity Schools.",
    icon: CalendarDays,
  },
  {
    phase: "Week 4-10",
    title: "Configuration and module adaptation",
    text: "Set up core modules for admission, academics, staff, finance, hostel operations, and parent communication.",
    icon: GraduationCap,
  },
  {
    phase: "Week 10-13",
    title: "Testing, deployment, and integration",
    text: "Conduct pilot validation, data migration, and integration into the national operating model.",
    icon: ShieldCheck,
  },
  {
    phase: "Week 13-20",
    title: "Training, monitoring, and optimization",
    text: "Capacity building, performance monitoring, and iterative optimization based on adoption and outcomes.",
    icon: BarChart3,
  },
];

const analyticsFocus = [
  { label: "Student enrollment statistics", icon: Users },
  { label: "Academic performance analysis", icon: GraduationCap },
  { label: "Teacher performance indicators", icon: Briefcase },
  { label: "Budget utilization reports", icon: Coins },
  { label: "Infrastructure usage monitoring", icon: Building2 },
  { label: "Predictive analytics for education planning", icon: ChartLine },
];

const contactChannels = [
  {
    label: "Email",
    value: "info@tr3-g.com.ng",
    href: "mailto:info@tr3-g.com.ng",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+234 704 8802 9218",
    href: "tel:+23470488029218",
    icon: Phone,
  },
  {
    label: "Office",
    value: "34 Wuse 3 FCT Abuja",
    href: "#contact",
    icon: Building2,
  },
];

const IconWrap = ({ icon: Icon }: { icon: LucideIcon }) => (
  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/8 text-foreground/70">
    <Icon className="h-4 w-4" />
  </span>
);

export default function Home() {
  return (
    <div className="relative mx-auto flex w-full flex-col gap-24 overflow-x-clip px-4 pb-24 pt-8 sm:px-6 md:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute top-[540px] right-[-56px] -z-10 hidden h-56 w-56 rounded-full bg-orange-400/10 blur-3xl md:block md:right-[-120px] md:h-72 md:w-72" />

      <section
        aria-label="Showcase"
        className="relative overflow-hidden rounded-[2.2rem] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.08),rgba(249,115,22,0.12),rgba(255,255,255,0.95))] px-6 py-8 shadow-[0_30px_100px_-40px_rgba(8,47,73,0.6)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(8,47,73,0.94),rgba(14,116,144,0.85),rgba(120,53,15,0.72))] md:px-10 md:py-12"
        id="home"
      >
        <div className="absolute -left-12 top-0 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute inset-y-0 right-[24%] hidden w-px bg-white/25 lg:block" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="relative z-10">
            <Chip className="border border-emerald-950/10 bg-background/80 px-4 text-emerald-900 dark:border-white/10 dark:bg-white/10 dark:text-emerald-100">
              Student management, redesigned
            </Chip>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
              School operations should feel like a product, not paperwork.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/72 md:text-lg">
              FUS-DITP gives schools one clear control surface for student
              records, staff management, attendance, result checking, parent
              access, and daily administration.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                as={Link}
                className="bg-emerald-600 px-6 text-white shadow-lg shadow-emerald-900/20"
                href="#overview"
                radius="full"
                size="lg"
              >
                <ArrowRight className="h-4 w-4" />
                Explore the platform
              </Button>
              <Button
                as={Link}
                className="border-emerald-700/40 bg-background/60 px-6 text-emerald-900 dark:text-emerald-100"
                href="#contact"
                radius="full"
                size="lg"
                variant="bordered"
              >
                <CalendarDays className="h-4 w-4" />
                Book a demo
              </Button>
            </div>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.4rem] border border-white/40 bg-background/70 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/35"
                >
                  <IconWrap icon={metric.icon} />
                  <p className="text-2xl font-semibold text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-foreground/68">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem]">
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full border border-white/40 bg-white/10 blur-2xl sm:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-slate-950/90 p-4 shadow-2xl shadow-slate-950/35">
              <div className="mb-4 flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-3 text-white">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                    Live dashboard
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    FUS-DITP control center
                  </p>
                </div>
                <Chip className="border-0 bg-emerald-400/20 text-emerald-200">
                  Online
                </Chip>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-2">
                <Image
                  priority
                  alt="FUS-DITP dashboard showcase"
                  className="h-auto w-full rounded-[1.1rem] object-cover"
                  height={600}
                  src="/arqelion-showcase.svg"
                  width={900}
                />
              </div>
            </div>

            <Card className="absolute bottom-6 left-3 hidden max-w-[200px] border border-white/50 bg-background/85 backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-950/80">
              <CardBody className="gap-1 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-foreground/55">
                  Result checker
                </p>
                <p className="text-lg font-semibold">Published in one tap</p>
                <p className="text-sm text-foreground/68">
                  Push term results directly to students and parents without manual exports.
                </p>
              </CardBody>
            </Card>

            <Card className="absolute right-3 top-12 hidden max-w-[170px] border border-white/50 bg-white/85 backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/80">
              <CardBody className="gap-1 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-foreground/55">
                  Attendance
                </p>
                <p className="text-3xl font-semibold text-emerald-700 dark:text-emerald-300">98%</p>
                <p className="text-xs text-foreground/68">Daily capture rate across active schools</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24" id="overview">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              National Problem Statement
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
              Why FUS-DITP is needed now
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-foreground/68">
            Federal Unity Schools need one integrated, transparent, and data-driven
            system to replace fragmented operations and improve national coordination.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((challenge) => (
            <Card
              key={challenge.text}
              className="border border-default-200/70 bg-background/80 backdrop-blur"
            >
              <CardBody className="flex-row items-start gap-3 p-5 text-sm leading-6 text-foreground/76">
                <IconWrap icon={challenge.icon} />
                <span>{challenge.text}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24" id="modules">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">
            Scope of Work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
            Integrated modules for all Unity Schools
          </h2>
          <p className="mt-3 text-base leading-7 text-foreground/68">
            FUS-DITP combines admissions, academics, staff, finance, hostel
            operations, and parent collaboration in one centralized national
            platform.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((service) => (
            <Card
              key={service.title}
              className={`overflow-hidden border backdrop-blur ${service.className}`}
            >
              <CardHeader className="flex-col items-start gap-4 p-6 pb-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/40 bg-background/75 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-foreground/60 dark:border-white/10 dark:bg-slate-950/35">
                    {service.number}
                  </div>
                  <IconWrap icon={service.icon} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
              </CardHeader>
              <CardBody className="p-6 pt-0 text-base leading-7 text-foreground/72">
                {service.text}
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24" id="deployment">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.98),rgba(8,47,73,0.95),rgba(120,53,15,0.72))] p-6 text-white md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100/70">
              Project Timeline
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
              Deployment and integration roadmap
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              The rollout follows a phased implementation covering planning,
              adaptation, testing, deployment, training, and optimization across
              all Federal Unity Schools.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4">
                <p className="text-3xl font-semibold">20</p>
                <p className="mt-2 text-sm text-white/68">Weeks full rollout window</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4">
                <p className="text-3xl font-semibold">4</p>
                <p className="mt-2 text-sm text-white/68">Implementation phases</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4">
                <p className="text-3xl font-semibold">109</p>
                <p className="mt-2 text-sm text-white/68">Unity Schools covered</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {timelinePhases.map((phase) => (
              <Card
                key={phase.phase}
                className="border border-default-200/70 bg-background/80 backdrop-blur"
              >
                <CardHeader className="pb-2">
                  <IconWrap icon={phase.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/55">
                    {phase.phase}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight">{phase.title}</h3>
                </CardHeader>
                <CardBody className="pt-0 text-sm leading-6 text-foreground/70">
                  {phase.text}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24" id="analytics">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
            National Education Analytics Dashboard
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
            From raw data to actionable oversight
          </h2>
          <p className="mt-3 text-base leading-7 text-foreground/68">
            The platform includes a central command view for enrollment trends,
            teacher indicators, academic outcomes, finance visibility, and
            infrastructure monitoring to support faster policy and operational
            decisions.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {analyticsFocus.map((item) => (
            <Card
              key={item.label}
              className="border border-default-200/70 bg-background/80 backdrop-blur"
            >
              <CardBody className="flex-row items-center gap-3 p-5 text-sm font-medium text-foreground/80">
                <IconWrap icon={item.icon} />
                <span>{item.label}</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="scroll-mt-24" id="contact">
        <div className="overflow-hidden rounded-[2rem] border border-default-200/70 bg-[linear-gradient(145deg,rgba(6,182,212,0.08),rgba(249,115,22,0.08),rgba(255,255,255,0.92))] p-6 dark:bg-[linear-gradient(145deg,rgba(8,47,73,0.45),rgba(120,53,15,0.24),rgba(15,23,42,0.94))] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                Contact
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
                Let us set up your school in days, not months
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70">
                Reach out to schedule a demo, talk through implementation, or
                request a request a custom package for your institution. We will
                choose the right rollout path for your school size.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  as={Link}
                  className="bg-slate-950 text-white dark:bg-emerald-600"
                  href="mailto:info@tr3-g.com.ng"
                  radius="full"
                >
                  <Mail className="h-4 w-4" />
                  Email the team
                </Button>
                <Button
                  as={Link}
                  className="bg-background/70"
                  href="/auth/login"
                  radius="full"
                  variant="bordered"
                >
                  <LogIn className="h-4 w-4" />
                  Go to Sign In
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {contactChannels.map((channel) => (
                <Card
                  key={channel.label}
                  className="border border-default-200/70 bg-background/80 backdrop-blur"
                >
                  <CardBody className="p-5">
                    <div className="flex items-center gap-2">
                      <channel.icon className="h-4 w-4 text-foreground/60" />
                      <p className="text-[11px] uppercase tracking-[0.24em] text-foreground/55">
                        {channel.label}
                      </p>
                    </div>
                    <Link
                      className="mt-2 text-base font-medium text-foreground"
                      href={channel.href}
                    >
                      {channel.value}
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
