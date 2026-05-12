"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Users, BookOpen, GraduationCap, Download } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold flex items-center gap-2"
          style={{ color: "#009966" }}
        >
          <GraduationCap className="w-6 h-6" />
          Learning Management System Dashboard
        </h1>
        <Button
          style={{ backgroundColor: "#009966", color: "white" }}
          variant="solid"
          startContent={<Download className="w-4 h-4" />}
        >
          Download Report
        </Button>
      </header>

      <p className="text-sm text-gray-600 italic">
        This dashboard is prepared according to the IPSAS-Compliant Accounting System.
      </p>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
          <CardHeader className="flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: "#009966" }} />
            <h2 className="text-lg font-semibold">Total Students</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-gray-800">1,250</p>
          </CardBody>
        </Card>

        <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
          <CardHeader className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: "#009966" }} />
            <h2 className="text-lg font-semibold">Total Courses</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-gray-800">85</p>
          </CardBody>
        </Card>

        <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
          <CardHeader className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" style={{ color: "#009966" }} />
            <h2 className="text-lg font-semibold">Total Tutors</h2>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold text-gray-800">32</p>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Section: Split 60/40 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Student List (60%) */}
        <Card
          className="md:col-span-3 shadow-md border"
          style={{ borderColor: "#009966" }}
        >
          <CardHeader>
            <h2 className="text-lg font-semibold" style={{ color: "#009966" }}>
              Student List
            </h2>
          </CardHeader>
          <CardBody>
            <Table aria-label="Student List Table" className="text-sm">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Course</TableColumn>
                <TableColumn>Progress</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ada Lovelace</TableCell>
                  <TableCell>Accounting Basics</TableCell>
                  <TableCell>75%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Public Finance</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mary Johnson</TableCell>
                  <TableCell>Business Ethics</TableCell>
                  <TableCell>60%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* Assessments (40%) */}
        <Card
          className="md:col-span-2 shadow-md border"
          style={{ borderColor: "#009966" }}
        >
          <CardHeader>
            <h2 className="text-lg font-semibold" style={{ color: "#009966" }}>
              Assessments
            </h2>
          </CardHeader>
          <CardBody>
            <Table aria-label="Assessments Table" className="text-sm">
              <TableHeader>
                <TableColumn>Assessment</TableColumn>
                <TableColumn>Course</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Midterm Exam</TableCell>
                  <TableCell>Accounting Basics</TableCell>
                  <TableCell>Scheduled</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Final Project</TableCell>
                  <TableCell>Public Finance</TableCell>
                  <TableCell>Ongoing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quiz 1</TableCell>
                  <TableCell>Business Ethics</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
