"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

const attendance = [
  { className: "JSS 1 Gold", present: 34, absent: 2, rate: "94%", trend: "Up" },
  { className: "JSS 2 Ruby", present: 30, absent: 4, rate: "88%", trend: "Down" },
  { className: "SS 1 Emerald", present: 29, absent: 3, rate: "91%", trend: "Up" },
  { className: "SS 3 Platinum", present: 28, absent: 1, rate: "97%", trend: "Up" },
];

const pastAttendanceByDate = [
  {
    date: "2026-04-12",
    records: [
      { className: "JSS 1 Gold", present: 33, absent: 3, rate: "92%", trend: "Up" },
      { className: "JSS 2 Ruby", present: 29, absent: 5, rate: "85%", trend: "Down" },
      { className: "SS 1 Emerald", present: 28, absent: 4, rate: "88%", trend: "Up" },
      { className: "SS 3 Platinum", present: 27, absent: 2, rate: "93%", trend: "Up" },
    ],
  },
  {
    date: "2026-04-11",
    records: [
      { className: "JSS 1 Gold", present: 35, absent: 1, rate: "97%", trend: "Up" },
      { className: "JSS 2 Ruby", present: 31, absent: 3, rate: "91%", trend: "Up" },
      { className: "SS 1 Emerald", present: 30, absent: 2, rate: "94%", trend: "Up" },
      { className: "SS 3 Platinum", present: 28, absent: 1, rate: "97%", trend: "Up" },
    ],
  },
  {
    date: "2026-04-10",
    records: [
      { className: "JSS 1 Gold", present: 32, absent: 4, rate: "89%", trend: "Down" },
      { className: "JSS 2 Ruby", present: 30, absent: 4, rate: "88%", trend: "Down" },
      { className: "SS 1 Emerald", present: 29, absent: 3, rate: "91%", trend: "Up" },
      { className: "SS 3 Platinum", present: 26, absent: 3, rate: "90%", trend: "Down" },
    ],
  },
  {
    date: "2026-04-09",
    records: [
      { className: "JSS 1 Gold", present: 34, absent: 2, rate: "94%", trend: "Up" },
      { className: "JSS 2 Ruby", present: 32, absent: 2, rate: "94%", trend: "Up" },
      { className: "SS 1 Emerald", present: 31, absent: 1, rate: "97%", trend: "Up" },
      { className: "SS 3 Platinum", present: 27, absent: 2, rate: "93%", trend: "Up" },
    ],
  },
];

export default function AttendancePage() {
  const [search, setSearch] = useState("");

  const filteredPastAttendance = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return pastAttendanceByDate;
    }

    return pastAttendanceByDate.filter((group) => group.date.toLowerCase().includes(query));
  }, [search]);

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Daily Operations</p>
            <h2 className="text-2xl font-semibold">Attendance Tracking</h2>
          </div>
          <Link href="/school/attendance/analytics">
            <Button color="primary" radius="full" size="sm" variant="bordered">Analytics</Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pb-2">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/60">
                <th className="px-6 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Present</th>
                <th className="px-4 py-3 font-medium">Absent</th>
                <th className="px-4 py-3 font-medium">Attendance Rate</th>
                <th className="px-4 py-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((item) => (
                <tr key={item.className} className="border-b border-default-100">
                  <td className="px-6 py-4 font-medium"><Link href={`/classes/${item.className?.replaceAll(" ", "-")?.toLowerCase()}`}>{item.className}</Link></td>
                  <td className="px-4 py-4 text-foreground/75">{item.present}</td>
                  <td className="px-4 py-4 text-foreground/75">{item.absent}</td>
                  <td className="px-4 py-4 text-foreground/75">{item.rate}</td>
                  <td className="px-4 py-4">
                    <Chip
                      className="border-0"
                      color={item.trend === "Up" ? "success" : "warning"}
                      size="sm"
                      variant="flat"
                    >
                      {item.trend}
                    </Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Historical Data</p>
            <h2 className="text-2xl font-semibold">Past Attendance Records</h2>
          </div>
          <Input
            className="w-full md:w-[320px]"
            labelPlacement="outside"
            placeholder="Search by date"
            type="date"
            size="lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardBody className="space-y-6 px-0 pb-6">
          {filteredPastAttendance.map((group) => (
            <div key={group.date} className="space-y-2">
              <div className="px-6">
                <p className="text-sm font-semibold text-foreground/70">Date: {group.date}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/60">
                      <th className="px-6 py-3 font-medium">Class</th>
                      <th className="px-4 py-3 font-medium">Present</th>
                      <th className="px-4 py-3 font-medium">Absent</th>
                      <th className="px-4 py-3 font-medium">Attendance Rate</th>
                      <th className="px-4 py-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.records.map((item) => (
                      <tr key={`${group.date}-${item.className}`} className="border-b border-default-100">
                        <td className="px-6 py-4 font-medium">
                          <Link href={`/classes/${item.className?.replaceAll(" ", "-")?.toLowerCase()}`}>{item.className}</Link>
                        </td>
                        <td className="px-4 py-4 text-foreground/75">{item.present}</td>
                        <td className="px-4 py-4 text-foreground/75">{item.absent}</td>
                        <td className="px-4 py-4 text-foreground/75">{item.rate}</td>
                        <td className="px-4 py-4">
                          <Chip
                            className="border-0"
                            color={item.trend === "Up" ? "success" : "warning"}
                            size="sm"
                            variant="flat"
                          >
                            {item.trend}
                          </Chip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          {filteredPastAttendance.length === 0 && (
            <div className="px-6 text-sm text-foreground/60">No attendance records found for your search.</div>
          )}
          <div className="px-6 pt-2">
            <Button className="w-full md:w-auto" radius="full" variant="bordered">Load More</Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
