"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

const courses = [
  { id: "accounting-basics", title: "Accounting Basics", desc: "Learn the fundamentals of accounting principles." },
  { id: "public-finance", title: "Public Finance", desc: "Explore government revenue, expenditure, and budgeting." },
  { id: "business-ethics", title: "Business Ethics", desc: "Understand ethical practices in corporate environments." },
  { id: "economics-101", title: "Economics 101", desc: "Introduction to micro and macroeconomic concepts." },
  { id: "auditing-principles", title: "Auditing Principles", desc: "Master auditing standards and compliance." },
  { id: "taxation-overview", title: "Taxation Overview", desc: "Learn tax systems and their applications." },
  { id: "budget-planning", title: "Budget Planning", desc: "Develop skills in financial planning and control." },
  { id: "financial-reporting", title: "Financial Reporting", desc: "Prepare and analyze financial statements." },
  { id: "corporate-governance", title: "Corporate Governance", desc: "Study frameworks for accountability and transparency." },
  { id: "investment-strategies", title: "Investment Strategies", desc: "Explore portfolio management and risk analysis." },
  { id: "risk-management", title: "Risk Management", desc: "Identify and mitigate financial risks effectively." },
  { id: "international-trade", title: "International Trade", desc: "Understand global trade policies and practices." },
];

export default function CoursesPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
        <CardHeader className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: "#009966" }}
          >
            <BookOpen className="w-6 h-6" />
            Courses
          </h1>
          <Button
            style={{ backgroundColor: "#009966", color: "white" }}
            variant="solid"
          >
            Browse All
          </Button>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600">
            Explore our curated list of professional courses. Click a course title to view details and enroll.
          </p>
        </CardBody>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="shadow-md border hover:shadow-lg transition"
            style={{ borderColor: "#009966" }}
          >
            <CardHeader>
              <Link
                href={`/school/e-learning/courses/${course.id}`}
                className="text-lg font-semibold hover:underline flex items-center gap-2"
                style={{ color: "#009966" }}
              >
                {course.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600">{course.desc}</p>
            </CardBody>
            <CardFooter>
              <span className="text-xs text-gray-400">Course ID: {course.id}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
