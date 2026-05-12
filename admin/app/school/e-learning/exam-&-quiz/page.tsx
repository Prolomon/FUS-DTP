"use client";

import {
  Tabs,
  Tab,
} from "@heroui/tabs";
import {
  Card,
  CardHeader,
  CardBody,
} from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { FileText, ClipboardList, PlusCircle } from "lucide-react";

export default function ExamQuizPage() {
  const [isExamModalOpen, setExamModalOpen] = useState(false);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <Card className="shadow-md border border-gray-200 p-2">
        <CardHeader className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: "#009966" }}
          >
            <ClipboardList className="w-6 h-6" />
            Exams & Quizzes
          </h1>
          <Button
            style={{ backgroundColor: "#009966", color: "white" }}
            variant="solid"
          >
            Manage
          </Button>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600">
            Create, edit, and track assessments for your courses.
          </p>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs aria-label="Exam and Quiz Tabs" color="success" variant="bordered">
        {/* Exams Tab */}
        <Tab
          key="exams"
          title={
            <span className="flex items-center gap-2 w-full">
              <FileText className="w-4 h-4" /> Exams
            </span>
          }
        >
          <div className="flex justify-end mb-4">
            <Button
              style={{ backgroundColor: "#009966", color: "white" }}
              startContent={<PlusCircle className="w-4 h-4" />}
              onPress={() => setExamModalOpen(true)}
            >
              Create Exam
            </Button>
          </div>
          <Table aria-label="Exams Table" className="text-sm">
            <TableHeader>
              <TableColumn>Course</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Venue</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Accounting Basics</TableCell>
                <TableCell>2026-06-01</TableCell>
                <TableCell>Hall A</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Public Finance</TableCell>
                <TableCell>2026-06-05</TableCell>
                <TableCell>Hall B</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tab>

        {/* Quizzes Tab */}
        <Tab
          key="quizzes"
          title={
            <span className="flex items-center gap-2 w-full">
              <ClipboardList className="w-4 h-4" /> Quizzes
            </span>
          }
        >
          <div className="flex justify-end mb-4">
            <Button
              style={{ backgroundColor: "#009966", color: "white" }}
              startContent={<PlusCircle className="w-4 h-4" />}
              onPress={() => setQuizModalOpen(true)}
            >
              Create Quiz
            </Button>
          </div>
          <Table aria-label="Quizzes Table" className="text-sm">
            <TableHeader>
              <TableColumn>Course</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Business Ethics</TableCell>
                <TableCell>2026-06-02</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Economics 101</TableCell>
                <TableCell>2026-06-03</TableCell>
                <TableCell>Scheduled</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tab>
      </Tabs>

      {/* Exam Modal */}
      <Modal isOpen={isExamModalOpen} onOpenChange={setExamModalOpen} size="2xl">
        <ModalContent>
          <ModalHeader>Create Exam</ModalHeader>
          <ModalBody className="space-y-4 grid grid-cols-2 max-md:grid-cols-1">
            <Select label="Subject">
              <SelectItem key="accounting">Accounting Basics</SelectItem>
              <SelectItem key="finance">Public Finance</SelectItem>
              <SelectItem key="ethics">Business Ethics</SelectItem>
            </Select>
            <Input label="Class/Level" />
            <Input label="Total Score Rating" type="number" />
            <Input label="Average Score" type="number" />
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
            <Input label="Venue" />
            <Select label="Question Type">
              <SelectItem key="theory">Theory</SelectItem>
              <SelectItem key="objective">Objective</SelectItem>
              <SelectItem key="mixed">Mixed</SelectItem>
            </Select>
            <Input label="Question" />
            <Textarea
              label="Options (for objective)"
              placeholder="a) Option A\nb) Option B\nc) Option C"
            />
            <Input label="Answer" placeholder="Expected last letter (e.g., c)" />
            <Button style={{ backgroundColor: "#009966", color: "white" }}>
              Add Question
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setExamModalOpen(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#009966", color: "white" }}>
              Save Exam
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Quiz Modal */}
      <Modal isOpen={isQuizModalOpen} onOpenChange={setQuizModalOpen} size="2xl">
        <ModalContent>
          <ModalHeader>Create Quiz</ModalHeader>
          <ModalBody className="space-y-4  grid grid-cols-2 max-md:grid-cols-1">
            <Select label="Subject">
              <SelectItem key="accounting">Accounting Basics</SelectItem>
              <SelectItem key="finance">Public Finance</SelectItem>
              <SelectItem key="ethics">Business Ethics</SelectItem>
            </Select>
            <Input label="Class/Level" />
            <Input label="Total Score Rating" type="number" />
            <Input label="Average Score" type="number" />
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
            <Input label="Venue" />
            <Select label="Question Type">
              <SelectItem key="theory">Theory</SelectItem>
              <SelectItem key="objective">Objective</SelectItem>
              <SelectItem key="mixed">Mixed</SelectItem>
            </Select>
            <Input label="Question" />
            <Textarea
              label="Options (for objective)"
              placeholder="a) Option A\nb) Option B\nc) Option C"
            />
            <Input label="Answer" placeholder="Expected last letter (e.g., c)" />
            <Button style={{ backgroundColor: "#009966", color: "white" }}>
              Add Question
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setQuizModalOpen(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#009966", color: "white" }}>
              Save Quiz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
