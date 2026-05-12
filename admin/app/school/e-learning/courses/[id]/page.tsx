"use client";

import {
  Card,
  CardHeader,
  CardBody,
} from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Textarea } from "@heroui/textarea";
import { FileText, Video, FileDown } from "lucide-react";

export default function CoursePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
        <CardHeader className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "#009966" }}>
            <Video className="w-6 h-6" />
            Course: Introduction to LMS
          </h1>
          <Button style={{ backgroundColor: "#009966", color: "white" }}>
            Enroll
          </Button>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Video Section (70%) */}
        <div className="lg:col-span-3">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[400px] rounded-md shadow-md"
              src="https://www.youtube.com/embed/2zv3iZpWz3g"
              title="Educational LMS Video"
              allowFullScreen
            ></iframe>
          </div>

          {/* Tabs under video */}
          <Tabs aria-label="Course Tabs" color="primary" variant="bordered" className="mt-6">
            {/* Course Materials */}
            <Tab key="materials" title="Course Materials">
              <div className="space-y-4">
                <p className="text-gray-700">
                  This course provides comprehensive insights into Learning Management Systems (LMS),
                  covering course creation, student management, assessments, and analytics. Below are
                  lecture notes and supporting materials.
                </p>

                {/* PDF Card */}
                <Card className="flex items-center justify-between p-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-gray-600" />
                    <span className="font-medium">LMS Overview.pdf</span>
                  </div>
                  <span className="text-sm text-gray-500">2.4 MB</span>
                  <Button
                    isIconOnly
                    style={{ backgroundColor: "#009966", color: "white" }}
                  >
                    <FileDown className="w-4 h-4" />
                  </Button>
                </Card>
              </div>
            </Tab>

            {/* Chat */}
            <Tab key="chat" title="Chat">
              <div className="space-y-4">
                <Textarea label="Chat" placeholder="Type your message..." />
                <Button style={{ backgroundColor: "#009966", color: "white" }}>Send</Button>
              </div>
            </Tab>

            {/* Assessment */}
            <Tab key="assessment" title="Assessment">
              <p className="text-gray-600">Assignments, quizzes, and exams will appear here.</p>
            </Tab>

            {/* Students */}
            <Tab key="students" title="Students">
              <Table aria-label="Students Table">
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Student ID</TableColumn>
                  <TableColumn>Rank</TableColumn>
                  <TableColumn>Score</TableColumn>
                  <TableColumn>Assessment</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Ada Lovelace</TableCell>
                    <TableCell>ST001</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>95%</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>ST002</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>88%</TableCell>
                    <TableCell>Done</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mary Johnson</TableCell>
                    <TableCell>ST003</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>72%</TableCell>
                    <TableCell>Not Done</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </div>

        {/* Module List (30%) */}
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <h2 className="text-lg font-semibold" style={{ color: "#009966" }}>
                Course Modules
              </h2>
            </CardHeader>
            <CardBody>
              <Accordion>
                <AccordionItem key="module1" aria-label="Module 1" title="Module 1: Introduction to LMS">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Overview of LMS</li>
                    <li>History of e-learning</li>
                    <li>Benefits of LMS</li>
                    <li>Key features</li>
                    <li>Case studies</li>
                  </ul>
                </AccordionItem>
                <AccordionItem key="module2" aria-label="Module 2" title="Module 2: Course Creation">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Creating modules</li>
                    <li>Adding multimedia</li>
                    <li>Structuring lessons</li>
                    <li>Publishing courses</li>
                  </ul>
                </AccordionItem>
                <AccordionItem key="module3" aria-label="Module 3" title="Module 3: User Management">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Adding students</li>
                    <li>Assigning roles</li>
                    <li>Tracking attendance</li>
                    <li>Managing permissions</li>
                  </ul>
                </AccordionItem>
                <AccordionItem key="module4" aria-label="Module 4" title="Module 4: Assessments">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Creating quizzes</li>
                    <li>Exam scheduling</li>
                    <li>Grading system</li>
                    <li>Feedback methods</li>
                  </ul>
                </AccordionItem>
                <AccordionItem key="module5" aria-label="Module 5" title="Module 5: Analytics & Reporting">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Tracking progress</li>
                    <li>Generating reports</li>
                    <li>Data visualization</li>
                    <li>Improving engagement</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
