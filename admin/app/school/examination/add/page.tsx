"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

const classOptions = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const subjectOptions = ["Mathematics", "English", "Biology", "Chemistry", "Physics", "Civic Education", "Computer Science"];
const gradingOptions = ["A-F", "A1-F9", "Percentage", "Custom"];
const examQuestionTypeOptions = [
  "Theory",
  "Objective",
  "German Objective",
  "Both Theory and Objective",
  "Both Theory and German Objective",
  "Both Objective and German Objective",
  "All of the above",
];
const questionBuilderTypeOptions = ["Theory", "Objective"];

type BuiltQuestion = {
  id: string;
  nameQuestion: string;
  questionType: "Theory" | "Objective";
  options: string[];
};

export default function AddExaminationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    className: "JSS1",
    teachers: "",
    subjects: "Mathematics",
    scoreGrading: "A-F",
    average: "",
    questionType: "Theory",
  });

  const [questionDraft, setQuestionDraft] = useState<{ nameQuestion: string; questionType: "Theory" | "Objective" }>({
    nameQuestion: "",
    questionType: "Theory",
  });
  const [objectiveOptionInput, setObjectiveOptionInput] = useState("");
  const [draftObjectiveOptions, setDraftObjectiveOptions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<BuiltQuestion[]>([]);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddOption = () => {
    if (!objectiveOptionInput.trim()) {
      return;
    }
    setDraftObjectiveOptions((prev) => [...prev, objectiveOptionInput.trim()]);
    setObjectiveOptionInput("");
  };

  const handleRemoveDraftOption = (indexToRemove: number) => {
    setDraftObjectiveOptions((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddQuestion = () => {
    if (!questionDraft.nameQuestion.trim()) {
      addToast({
        title: "Missing question",
        description: "Question name is required.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    if (questionDraft.questionType === "Objective" && draftObjectiveOptions.length < 2) {
      addToast({
        title: "Options required",
        description: "Objective question needs at least 2 options.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    const newQuestion: BuiltQuestion = {
      id: `${Date.now()}`,
      nameQuestion: questionDraft.nameQuestion.trim(),
      questionType: questionDraft.questionType,
      options: questionDraft.questionType === "Objective" ? draftObjectiveOptions : [],
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setQuestionDraft({ nameQuestion: "", questionType: "Theory" });
    setObjectiveOptionInput("");
    setDraftObjectiveOptions([]);

    addToast({
      title: "Question added",
      description: "Question added to exam draft.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    addToast({
      title: "Question removed",
      description: "Question removed from exam draft.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      className: "JSS1",
      teachers: "",
      subjects: "Mathematics",
      scoreGrading: "A-F",
      average: "",
      questionType: "Theory",
    });
    setQuestionDraft({ nameQuestion: "", questionType: "Theory" });
    setObjectiveOptionInput("");
    setDraftObjectiveOptions([]);
    setQuestions([]);

    addToast({
      title: "Form cleared",
      description: "Examination form has been reset.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleUpload = () => {
    if (!formData.name || !formData.teachers || questions.length === 0) {
      addToast({
        title: "Missing fields",
        description: "Exam name, teachers, and at least one question are required.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    addToast({
      title: "Uploaded",
      description: "Examination uploaded successfully.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-8">
      <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
        <CardHeader className="px-6 pt-6 pb-2">
          <h2 className="text-xl font-semibold">Add Examination</h2>
        </CardHeader>

        <CardBody className="space-y-6 px-6 pb-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
            <Select label="Class" selectedKeys={[formData.className]} onSelectionChange={(keys) => handleChange("className", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
              {classOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
            </Select>
            <Input label="Teachers" placeholder="Teacher names (comma separated)" value={formData.teachers} onChange={(e) => handleChange("teachers", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
            <Select label="Subjects" selectedKeys={[formData.subjects]} onSelectionChange={(keys) => handleChange("subjects", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
              {subjectOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
            </Select>
            <Select label="Score Grading" selectedKeys={[formData.scoreGrading]} onSelectionChange={(keys) => handleChange("scoreGrading", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
              {gradingOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
            </Select>
            <Input label="Average" type="number" value={formData.average} onChange={(e) => handleChange("average", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
            <Select
              label="Question Type"
              selectedKeys={[formData.questionType]}
              onSelectionChange={(keys) => handleChange("questionType", Array.from(keys)[0] as string)}
              size="lg"
              variant="bordered"
              labelPlacement="outside"
            >
              {examQuestionTypeOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
            </Select>
          </div>

          <Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
            <CardHeader className="px-4 py-4">
              <h3 className="text-lg font-semibold">Add Question</h3>
            </CardHeader>
            <CardBody className="space-y-4 px-4 pb-4">
              <Input
                label="Name Question"
                placeholder="Enter question name"
                value={questionDraft.nameQuestion}
                onChange={(e) => setQuestionDraft((prev) => ({ ...prev, nameQuestion: e.target.value }))}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
              />
              <Select
                label="Question Type"
                selectedKeys={[questionDraft.questionType]}
                onSelectionChange={(keys) => setQuestionDraft((prev) => ({ ...prev, questionType: Array.from(keys)[0] as "Theory" | "Objective" }))}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
              >
                {questionBuilderTypeOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
              </Select>

              {questionDraft.questionType === "Objective" && (
                <div className="space-y-3 rounded-xl border border-emerald-100/70 p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end">
                    <Input
                      className="w-full"
                      label="Objective Option"
                      placeholder="Type one option"
                      value={objectiveOptionInput}
                      onChange={(e) => setObjectiveOptionInput(e.target.value)}
                      size="lg"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Button className="bg-emerald-600 text-white" radius="full" onPress={handleAddOption}>
                      Add Option
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {draftObjectiveOptions.map((opt, idx) => (
                      <div key={`${opt}-${idx}`} className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                        <span>{opt}</span>
                        <button
                          type="button"
                          className="rounded-full px-1 font-bold text-emerald-700 hover:bg-emerald-100"
                          onClick={() => handleRemoveDraftOption(idx)}
                          aria-label={`Remove option ${opt}`}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button className="bg-emerald-600 text-white" radius="full" onPress={handleAddQuestion}>
                Add Question
              </Button>

              {questions.length > 0 && (
                <div className="space-y-2 rounded-xl border border-emerald-100/70 p-3">
                  <p className="text-sm font-semibold">Added Questions ({questions.length})</p>
                  {questions.map((q, idx) => (
                    <div key={q.id} className="rounded-lg border border-emerald-100/70 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium">{idx + 1}. {q.nameQuestion}</p>
                        <Button
                          className="border-emerald-600 text-emerald-700"
                          variant="bordered"
                          radius="full"
                          size="sm"
                          onPress={() => handleRemoveQuestion(q.id)}
                        >
                          Remove Question
                        </Button>
                      </div>
                      <p className="text-xs text-foreground/70">Type: {q.questionType}</p>
                      {q.questionType === "Objective" && q.options.length > 0 && (
                        <p className="text-xs text-foreground/70">Options: {q.options.join(", ")}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </CardBody>

        <CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
          <Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleClear}>
            Clear Form
          </Button>
          <Button className="w-full bg-emerald-600 text-white" radius="full" size="lg" onPress={handleUpload}>
            Upload
          </Button>
          <Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleCancel}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
