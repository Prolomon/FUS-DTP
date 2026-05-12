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
import { Input, Textarea } from "@heroui/input";
import { FileText, Video, FileDown } from "lucide-react";

export default function CoursePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
        <CardHeader className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: "#009966" }}
          >
            <Video className="w-6 h-6" />
            Course: Introduction to LMS
          </h1>
          <Button
            style={{ backgroundColor: "#009966", color: "white" }}
            variant="solid"
          >
            Enroll
          </Button>
        </CardHeader>
      </Card>

      {/* Video Full Width */}
      <div className="w-full">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[500px] rounded-md shadow-md"
            src="https://www.youtube.com/embed/ezbJwaLmOeM?si=EjLKv-OSu3jdWe2r"
            title="Educational LMS Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
        {/* Course Modules (60%) */}
        <div className="lg:col-span-3">
          <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
            <CardHeader>
              <h2 className="text-lg font-semibold" style={{ color: "#009966" }}>
                Course Modules
              </h2>
            </CardHeader>
            <CardBody>
              <Accordion>
                <AccordionItem key="module1" title="Module 1: Introduction to LMS">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Overview of LMS</li>
                    <li>History of e-learning</li>
                    <li>Benefits of LMS</li>
                    <li>Key features</li>
                    <li>Case studies</li>
                  </ul>
                </AccordionItem>
                <AccordionItem key="module2" title="Module 2: Course Creation">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Creating modules</li>
                    <li>Adding multimedia</li>
                    <li>Structuring lessons</li>
                    <li>Publishing courses</li>
                  </ul>
                </AccordionItem>
                <AccordionItem key="module3" title="Module 3: User Management">
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Adding students</li>
                    <li>Assigning roles</li>
                    <li>Tracking attendance</li>
                    <li>Managing permissions</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </div>

        {/* Tabs Section (40%) */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border" style={{ borderColor: "#009966" }}>
            <CardHeader>
              <h2 className="text-lg font-semibold" style={{ color: "#009966" }}>
                Course Resources
              </h2>
            </CardHeader>
            <CardBody>
              <Tabs aria-label="Course Tabs" color="primary" variant="bordered">
                {/* Course Materials */}
                <Tab key="materials" title="Materials">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Lecture notes and supporting materials for this course.
                    </p>
                    <Card className="flex items-center justify-between p-4 shadow-md border" style={{ borderColor: "#009966" }}>
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6" style={{ color: "#009966" }} />
                        <span className="font-medium text-gray-800">LMS Overview.pdf</span>
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
                    {/* Chat History */}
                    <div className="space-y-2">
                      <div className="p-2 rounded-md bg-gray-100 text-sm">
                        <span className="font-semibold" style={{ color: "#009966" }}>Ada:</span> Hi everyone, excited to start this LMS course!
                      </div>
                      <div className="p-2 rounded-md bg-gray-50 text-sm">
                        <span className="font-semibold" style={{ color: "#009966" }}>John:</span> Same here, looking forward to learning.
                      </div>
                    </div>
                    {/* New Message */}
                    <Textarea label="Your Message" placeholder="Type your message..." />
                    <Button style={{ backgroundColor: "#009966", color: "white" }}>Send</Button>
                  </div>
                </Tab>

                {/* Assessment */}
                <Tab key="assessment" title="Assessment">
                  <div className="space-y-4">
                    <p className="text-gray-700">Quick Quiz:</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">1. What does LMS stand for?</p>
                      <ul className="list-disc pl-6 text-sm text-gray-700">
                        <li>Learning Management System</li>
                        <li>Lecture Management Software</li>
                        <li>Learning Module Setup</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">2. Which of these is a benefit of LMS?</p>
                      <ul className="list-disc pl-6 text-sm text-gray-700">
                        <li>Centralized learning</li>
                        <li>Manual grading only</li>
                        <li>No tracking of progress</li>
                      </ul>
                    </div>
                  </div>
                </Tab>

                {/* Students */}
                <Tab key="students" title="Students">
                  <Table aria-label="Students Table" className="text-sm">
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
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
