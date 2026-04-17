import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";

const schedules = [
  { title: "Assembly", time: "08:00 AM", venue: "Main Court", type: "School-wide" },
  { title: "Mathematics Test", time: "10:30 AM", venue: "Exam Hall", type: "Assessment" },
  { title: "Parent Meeting", time: "01:00 PM", venue: "Conference Room", type: "Parent" },
  { title: "Staff Briefing", time: "03:30 PM", venue: "Admin Office", type: "Admin" },
];

export default function SchedulePage() {
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
        <CardHeader className="px-6 pt-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Calendar</p>
            <h2 className="text-2xl font-semibold">School Schedule</h2>
          </div>
          <Button
            as={Link}
            href="/school/schedule/add"
            className="bg-emerald-600 text-white" radius="full"
          >
            Add Schedule
          </Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {schedules.map((item) => (
            <div key={`${item.title}-${item.time}`} className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{item.title}</p>
                <Chip className="border-0" color="primary" size="sm" variant="flat">{item.type}</Chip>
              </div>
              <p className="mt-1 text-sm text-foreground/70">Time: {item.time}</p>
              <p className="mt-1 text-xs text-foreground/60">Venue: {item.venue}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
