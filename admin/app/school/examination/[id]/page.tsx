"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import Link from "next/link";

type ExamQuestion = {
  id: string;
  question: string;
  answer: string;
  questionType: "Theory" | "Objective";
  options: string[];
};

type Teacher = {
  id: string;
  name: string;
  subject: string;
};

const availableTeachers: Teacher[] = [
  { id: "tch-001", name: "Mrs. Amina", subject: "Mathematics" },
  { id: "tch-002", name: "Mr. Joseph", subject: "English" },
  { id: "tch-003", name: "Dr. Uche", subject: "Biology" },
  { id: "tch-004", name: "Mrs. Tobi", subject: "Computer Science" },
  { id: "tch-005", name: "Mr. Bala", subject: "Civic Education" },
];

export default function ExaminationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params?.id as string;

  const [questions, setQuestions] = useState<ExamQuestion[]>([
    {
      id: "q-1",
      question: "Solve: 2x + 7 = 19",
      answer: "x = 6",
      questionType: "Theory",
      options: [],
    },
    {
      id: "q-2",
      question: "Which of the following is a prime number?",
      answer: "17",
      questionType: "Objective",
      options: ["14", "17", "21", "27"],
    },
    {
      id: "q-3",
      question: "Find the value of 25% of 320.",
      answer: "80",
      questionType: "Theory",
      options: [],
    },
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: "tch-001", name: "Mrs. Amina", subject: "Mathematics" },
    { id: "tch-004", name: "Mrs. Tobi", subject: "Computer Science" },
  ]);

  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestionType, setEditingQuestionType] = useState<"Theory" | "Objective">("Theory");
  const [editingQuestionText, setEditingQuestionText] = useState("");
  const [editingAnswerText, setEditingAnswerText] = useState("");
  const [editingOptions, setEditingOptions] = useState<string[]>([]);
  const [editingOptionInput, setEditingOptionInput] = useState("");

  const studentScores = [
    { admissionNo: "STU-001", studentName: "Aisha Bello", theoryScore: 40, objectiveScore: 38, grade: "A" },
    { admissionNo: "STU-014", studentName: "David Okafor", theoryScore: 30, objectiveScore: 34, grade: "C" },
    { admissionNo: "STU-022", studentName: "Chinedu Nnaji", theoryScore: 45, objectiveScore: 44, grade: "A" },
    { admissionNo: "STU-031", studentName: "Mariam Lawal", theoryScore: 34, objectiveScore: 38, grade: "B" },
    { admissionNo: "STU-044", studentName: "Samuel Peter", theoryScore: 25, objectiveScore: 33, grade: "D" },
  ];

  const assignableTeachers = useMemo(
    () => availableTeachers.filter((teacher) => !teachers.some((assigned) => assigned.id === teacher.id)),
    [teachers],
  );

  const handlePublishToTeachers = () => {
    addToast({
      title: "Published",
      description: "Examination has been published to assigned teachers.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleRemoveTeacher = (teacherId: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
    addToast({
      title: "Teacher removed",
      description: "Teacher has been removed from this examination.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleAssignTeacher = () => {
    if (!selectedTeacherId) {
      addToast({
        title: "No teacher selected",
        description: "Please select a teacher to assign.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    const teacherToAssign = availableTeachers.find((teacher) => teacher.id === selectedTeacherId);

    if (!teacherToAssign) {
      return;
    }

    setTeachers((prev) => [teacherToAssign, ...prev]);
    setSelectedTeacherId("");
    setShowAssignTeacherModal(false);
    addToast({
      title: "Teacher assigned",
      description: `${teacherToAssign.name} has been assigned to this examination.`,
      color: "success",
      closeIcon: true,
    });
  };

  const handleStartQuestionEdit = (question: ExamQuestion) => {
    setEditingQuestionId(question.id);
    setEditingQuestionType(question.questionType);
    setEditingQuestionText(question.question);
    setEditingAnswerText(question.answer);
    setEditingOptions(question.options);
    setEditingOptionInput("");
  };

  const handleAddEditOption = () => {
    if (!editingOptionInput.trim()) {
      return;
    }
    setEditingOptions((prev) => [...prev, editingOptionInput.trim()]);
    setEditingOptionInput("");
  };

  const handleRemoveEditOption = (indexToRemove: number) => {
    setEditingOptions((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveQuestionEdit = () => {
    if (!editingQuestionId || !editingQuestionText.trim()) {
      return;
    }

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === editingQuestionId
          ? {
              ...q,
              question: editingQuestionText.trim(),
              answer: editingAnswerText.trim(),
              options: q.questionType === "Objective" ? editingOptions : q.options,
            }
          : q,
      ),
    );
    setEditingQuestionId(null);
    setEditingQuestionType("Theory");
    setEditingQuestionText("");
    setEditingAnswerText("");
    setEditingOptions([]);
    setEditingOptionInput("");
    addToast({
      title: "Question updated",
      description: "Question edited successfully.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleCancelQuestionEdit = () => {
    setEditingQuestionId(null);
    setEditingQuestionType("Theory");
    setEditingQuestionText("");
    setEditingAnswerText("");
    setEditingOptions([]);
    setEditingOptionInput("");
  };

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <h2 className="text-2xl font-semibold">Examination Detail</h2>
            <p className="mt-1 text-sm text-foreground/70">Exam ID: {examId}</p>
          </div>
          <Button className="bg-emerald-600 text-white" radius="full" onPress={handlePublishToTeachers}>
            Publish to Teachers
          </Button>
        </CardHeader>
        <CardBody className="space-y-4 px-6 pb-6">
          <p className="text-sm text-foreground/70">Questions for this examination:</p>

          {questions.map((question, index) => (
            <div key={question.id} className="rounded-xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
              {editingQuestionId === question.id ? (
                <div className="space-y-3">
                  <Input
                    label={`Question ${index + 1}`}
                    value={editingQuestionText}
                    onChange={(e) => setEditingQuestionText(e.target.value)}
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Input
                    label="Answer"
                    value={editingAnswerText}
                    onChange={(e) => setEditingAnswerText(e.target.value)}
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  {editingQuestionType === "Objective" && (
                    <div className="space-y-3 rounded-xl border border-emerald-100/70 p-3">
                      <div className="flex flex-col gap-3 md:flex-row md:items-end">
                        <Input
                          className="w-full"
                          label="Option"
                          placeholder="Add objective option"
                          value={editingOptionInput}
                          onChange={(e) => setEditingOptionInput(e.target.value)}
                          variant="bordered"
                          labelPlacement="outside"
                        />
                        <Button className="bg-emerald-600 text-white" radius="full" size="sm" onPress={handleAddEditOption}>
                          Add Option
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {editingOptions.map((opt, idx) => (
                          <div key={`${opt}-${idx}`} className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                            <span>{opt}</span>
                            <button
                              type="button"
                              className="rounded-full px-1 font-bold text-emerald-700 hover:bg-emerald-100"
                              onClick={() => handleRemoveEditOption(idx)}
                              aria-label={`Remove option ${opt}`}
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button className="bg-emerald-600 text-white" radius="full" size="sm" onPress={handleSaveQuestionEdit}>
                      Save
                    </Button>
                    <Button variant="bordered" radius="full" size="sm" onPress={handleCancelQuestionEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{index + 1}. {question.question}</p>
                    <Button className="border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="sm" onPress={() => handleStartQuestionEdit(question)}>
                      Edit
                    </Button>
                  </div>
                  <Chip className="border-0" color="primary" size="sm" variant="flat">
                    {question.questionType}
                  </Chip>
                  <p className="text-xs text-foreground/70">Answer: {question.answer || "-"}</p>
                  {question.questionType === "Objective" && question.options.length > 0 && (
                    <p className="text-xs text-foreground/70">Options: {question.options.join(", ")}</p>
                  )}
                </div>
              )}
            </div>
          ))}

          <Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
            <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-4 pt-4 pb-2">
              <h3 className="text-lg font-semibold">Assigned Teachers</h3>
              <Button className="bg-emerald-600 text-white" radius="full" size="sm" onPress={() => setShowAssignTeacherModal(true)}>
                Assign New Teacher
              </Button>
            </CardHeader>
            <CardBody className="space-y-3 px-4 pb-4">
              {teachers.length === 0 ? (
                <p className="text-sm text-foreground/70">No teacher assigned yet.</p>
              ) : (
                teachers.map((teacher) => (
                  <div key={teacher.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-100/70 p-3">
                    <div>
                      <p className="text-sm font-medium">{teacher.name}</p>
                      <p className="text-xs text-foreground/70">Subject: {teacher.subject}</p>
                    </div>
                    <Button color="danger" variant="flat" radius="full" size="sm" onPress={() => handleRemoveTeacher(teacher.id)}>
                      Remove Teacher
                    </Button>
                  </div>
                ))
              )}
            </CardBody>
          </Card>

          <Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
            <CardHeader className="px-4 pt-4 pb-2">
              <h3 className="text-lg font-semibold">Student Participation & Scores</h3>
            </CardHeader>
            <CardBody className="overflow-x-auto px-0 pb-4">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/60">
                    <th className="px-4 py-3 font-medium">Admission No.</th>
                    <th className="px-4 py-3 font-medium">Student Name</th>
                    <th className="px-4 py-3 font-medium">Theory Score</th>
                    <th className="px-4 py-3 font-medium">Objective Score</th>
                    <th className="px-4 py-3 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {studentScores.map((student) => (
                    <tr key={student.admissionNo} className="border-b border-default-100">
                      <td className="px-4 py-3 text-foreground/75">
                        <Link className="text-emerald-700 hover:underline dark:text-emerald-300" href={`/school/students/${student.admissionNo}`}>
                          {student.admissionNo}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium">{student.studentName}</td>
                      <td className="px-4 py-3 text-foreground/75">{student.theoryScore}</td>
                      <td className="px-4 py-3 text-foreground/75">{student.objectiveScore}</td>
                      <td className="px-4 py-3 text-foreground/75">{student.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Button className="w-full md:w-auto border-emerald-600 text-emerald-700" variant="bordered" radius="full" onPress={() => router.back()}>
            Back
          </Button>
        </CardBody>
      </Card>

      <Modal isOpen={showAssignTeacherModal} onClose={() => setShowAssignTeacherModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Assign Teacher</ModalHeader>
          <ModalBody>
            <Select
              label="Teacher"
              selectedKeys={selectedTeacherId ? [selectedTeacherId] : []}
              onSelectionChange={(keys) => setSelectedTeacherId(Array.from(keys)[0] as string)}
              size="lg"
              variant="bordered"
              labelPlacement="outside"
            >
              {assignableTeachers.map((teacher) => (
                <SelectItem key={teacher.id}>{teacher.name} - {teacher.subject}</SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="full" onPress={() => setShowAssignTeacherModal(false)}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 text-white" radius="full" onPress={handleAssignTeacher}>
              Assign Teacher
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
