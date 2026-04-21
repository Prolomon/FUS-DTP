"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Link } from "@heroui/link";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";

type StepKey = "profile" | "leadership" | "security";

const stepItems: { key: StepKey; title: string; subtitle: string }[] = [
  {
    key: "profile",
    title: "School Profile",
    subtitle: "Campus identity and enrollment details",
  },
  {
    key: "leadership",
    title: "School Leadership",
    subtitle: "Principal or owner contact information",
  },
  {
    key: "security",
    title: "Security",
    subtitle: "Credentials for secure access",
  },
];

const schoolTypeOptions = ["Private", "Public", "Mission", "International"];
const studentMixOptions = ["Boys", "Girls", "Mixed"];
const boardingOptions = ["Day", "Boarding", "Both"];
const stateOptions = ["FCT", "Kano", "Kaduna", "Lagos", "Rivers"];

export default function RegisterPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<StepKey>("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolEmail: "",
    schoolPhone: "",
    registrationNumber: "",
    schoolType: "Private",
    studentMix: "Mixed",
    boardingOption: "Day",
    yearEstablished: "",
    studentCount: "",
    campusCapacity: "",
    country: "Nigeria",
    state: "FCT",
    lga: "",
    schoolAddress: "",
    principalName: "",
    principalEmail: "",
    principalPhone: "",
    ownerName: "",
    ownerPhone: "",
    password: "",
    confirmPassword: "",
  });

  const stepIndex = useMemo(
    () => stepItems.findIndex((item) => item.key === activeStep),
    [activeStep],
  );

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const requiredForStep: Record<StepKey, (keyof typeof formData)[]> = {
    profile: [
      "schoolName",
      "schoolEmail",
      "schoolPhone",
      "schoolType",
      "state",
      "schoolAddress",
    ],
    leadership: ["principalName", "principalEmail", "principalPhone"],
    security: ["password", "confirmPassword"],
  };

  const validateStep = (step: StepKey) => {
    const missing = requiredForStep[step].filter(
      (field) => !String(formData[field]).trim(),
    );

    if (missing.length) {
      addToast({
        title: "Validation failed",
        description: "Please fill in all required fields for this step.",
        color: "danger",
        closeIcon: true,
      });

      return false;
    }

    if (step === "security" && formData.password !== formData.confirmPassword) {
      addToast({
        title: "Passwords do not match",
        description: "Confirm password must match the password field.",
        color: "danger",
        closeIcon: true,
      });

      return false;
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep(activeStep)) return;
    if (stepIndex < stepItems.length - 1) {
      setActiveStep(stepItems[stepIndex + 1].key);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setActiveStep(stepItems[stepIndex - 1].key);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep("security")) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (formData.schoolEmail.toLowerCase().includes("fail")) {
        throw new Error("Simulated request failure");
      }

      addToast({
        title: "Sign up successful",
        description: "Your school account has been created successfully.",
        color: "success",
        closeIcon: true,
      });

      router.push("/auth/login");
    } catch {
      addToast({
        title: "Sign up failed",
        description: "Unable to create account right now. Please try again.",
        color: "danger",
        closeIcon: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative mx-auto w-full overflow-x-clip px-4 pb-16 pt-8 sm:px-6 md:pt-12">
      <div className="pointer-events-none absolute left-[-70px] top-[-30px] -z-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-90px] top-[240px] -z-10 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(249,115,22,0.12),rgba(255,255,255,0.96))] p-6 shadow-[0_24px_80px_-40px_rgba(8,47,73,0.5)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(8,47,73,0.94),rgba(14,116,144,0.82),rgba(120,53,15,0.68))] md:p-8 lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800 dark:text-emerald-200">
            School Onboarding
          </p>
          <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
            Register your school in three quick steps.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">
            Tell us about your campus, enrollment, and leadership so we can
            tailor workflows and security settings to your needs.
          </p>

          <div className="mt-6 space-y-3">
            {stepItems.map((step, index) => (
              <button
                key={step.key}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left backdrop-blur transition ${
                  activeStep === step.key
                    ? "border-emerald-600 bg-emerald-50/90 text-emerald-900 dark:border-emerald-300 dark:bg-emerald-950/35 dark:text-emerald-100"
                    : "border-white/50 bg-background/75 text-foreground/85 dark:border-white/10 dark:bg-slate-950/35"
                }`}
                type="button"
                onClick={() => setActiveStep(step.key)}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {step.title}
                  </span>
                  <span className="block text-xs opacity-80">
                    {step.subtitle}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <Card className="rounded-[2rem] border border-default-200/70 bg-background/85 shadow-lg shadow-emerald-900/5 backdrop-blur">
          <CardHeader className="flex flex-col items-start gap-3 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/55">
              Step {stepIndex + 1} of {stepItems.length}
            </p>
            <h2 className="text-3xl font-semibold">
              {stepItems[stepIndex].title}
            </h2>
            <div className="inline-flex rounded-full border border-default-300/70 bg-default-100/70 p-1">
              {stepItems.map((step) => (
                <button
                  key={step.key}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    step.key === activeStep
                      ? "bg-emerald-600 text-white"
                      : "text-foreground/65"
                  }`}
                  type="button"
                  onClick={() => setActiveStep(step.key)}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardBody className="gap-4 p-6 pt-0 md:p-8 md:pt-0">
            {activeStep === "profile" && (
              <>
                <Input
                  isRequired
                  label="School Name"
                  labelPlacement="outside"
                  placeholder="Sunrise International School"
                  size="lg"
                  value={formData.schoolName}
                  onChange={(e) => updateField("schoolName", e.target.value)}
                />
                <Input
                  isRequired
                  label="School Email"
                  labelPlacement="outside"
                  placeholder="admin@school.edu"
                  size="lg"
                  type="email"
                  value={formData.schoolEmail}
                  onChange={(e) => updateField("schoolEmail", e.target.value)}
                />
                <Input
                  isRequired
                  label="School Phone"
                  labelPlacement="outside"
                  placeholder="+2348012345678"
                  size="lg"
                  value={formData.schoolPhone}
                  onChange={(e) => updateField("schoolPhone", e.target.value)}
                />
                <Input
                  label="Registration Number"
                  labelPlacement="outside"
                  placeholder="RC-2026-0042"
                  size="lg"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    updateField("registrationNumber", e.target.value)
                  }
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Select
                    label="School Type"
                    labelPlacement="outside"
                    selectedKeys={[formData.schoolType]}
                    size="lg"
                    onSelectionChange={(keys) =>
                      updateField("schoolType", Array.from(keys)[0] as string)
                    }
                  >
                    {schoolTypeOptions.map((item) => (
                      <SelectItem key={item}>{item}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Student Mix"
                    labelPlacement="outside"
                    selectedKeys={[formData.studentMix]}
                    size="lg"
                    onSelectionChange={(keys) =>
                      updateField("studentMix", Array.from(keys)[0] as string)
                    }
                  >
                    {studentMixOptions.map((item) => (
                      <SelectItem key={item}>{item}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Select
                    label="Boarding Option"
                    labelPlacement="outside"
                    selectedKeys={[formData.boardingOption]}
                    size="lg"
                    onSelectionChange={(keys) =>
                      updateField(
                        "boardingOption",
                        Array.from(keys)[0] as string,
                      )
                    }
                  >
                    {boardingOptions.map((item) => (
                      <SelectItem key={item}>{item}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Year Established"
                    labelPlacement="outside"
                    placeholder="2010"
                    size="lg"
                    type="number"
                    value={formData.yearEstablished}
                    onChange={(e) =>
                      updateField("yearEstablished", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Current Student Count"
                    labelPlacement="outside"
                    placeholder="550"
                    size="lg"
                    type="number"
                    value={formData.studentCount}
                    onChange={(e) =>
                      updateField("studentCount", e.target.value)
                    }
                  />
                  <Input
                    label="Campus Capacity"
                    labelPlacement="outside"
                    placeholder="800"
                    size="lg"
                    type="number"
                    value={formData.campusCapacity}
                    onChange={(e) =>
                      updateField("campusCapacity", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Country"
                    labelPlacement="outside"
                    size="lg"
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                  />
                  <Select
                    label="State"
                    labelPlacement="outside"
                    selectedKeys={[formData.state]}
                    size="lg"
                    onSelectionChange={(keys) =>
                      updateField("state", Array.from(keys)[0] as string)
                    }
                  >
                    {stateOptions.map((item) => (
                      <SelectItem key={item}>{item}</SelectItem>
                    ))}
                  </Select>
                </div>

                <Input
                  isRequired
                  label="Local Government Area"
                  labelPlacement="outside"
                  placeholder="Municipal Area Council"
                  size="lg"
                  value={formData.lga}
                  onChange={(e) => updateField("lga", e.target.value)}
                />
                <Textarea
                  isRequired
                  label="School Address"
                  labelPlacement="outside"
                  minRows={3}
                  placeholder="No. 12, Knowledge Avenue, Abuja"
                  value={formData.schoolAddress}
                  onChange={(e) => updateField("schoolAddress", e.target.value)}
                />
              </>
            )}

            {activeStep === "leadership" && (
              <>
                <Input
                  isRequired
                  label="Principal / Owner Name"
                  labelPlacement="outside"
                  placeholder="Amina Yusuf"
                  size="lg"
                  value={formData.principalName}
                  onChange={(e) => updateField("principalName", e.target.value)}
                />
                <Input
                  isRequired
                  label="Principal Email"
                  labelPlacement="outside"
                  placeholder="principal@school.edu"
                  size="lg"
                  type="email"
                  value={formData.principalEmail}
                  onChange={(e) =>
                    updateField("principalEmail", e.target.value)
                  }
                />
                <Input
                  isRequired
                  label="Principal Phone"
                  labelPlacement="outside"
                  placeholder="+2348099990000"
                  size="lg"
                  value={formData.principalPhone}
                  onChange={(e) =>
                    updateField("principalPhone", e.target.value)
                  }
                />
                <Input
                  label="Owner Name (Optional)"
                  labelPlacement="outside"
                  placeholder="John Doe"
                  size="lg"
                  value={formData.ownerName}
                  onChange={(e) => updateField("ownerName", e.target.value)}
                />
                <Input
                  label="Owner Phone (Optional)"
                  labelPlacement="outside"
                  placeholder="+2348000000000"
                  size="lg"
                  value={formData.ownerPhone}
                  onChange={(e) => updateField("ownerPhone", e.target.value)}
                />
              </>
            )}

            {activeStep === "security" && (
              <>
                <Input
                  isRequired
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Create a strong password"
                  size="lg"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                />
                <Input
                  isRequired
                  label="Confirm Password"
                  labelPlacement="outside"
                  placeholder="Re-enter your password"
                  size="lg"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                />
              </>
            )}

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <Button
                  isDisabled={stepIndex === 0 || isSubmitting}
                  radius="full"
                  variant="bordered"
                  onPress={goBack}
                >
                  Back
                </Button>
                {stepIndex < stepItems.length - 1 ? (
                  <Button
                    className="bg-emerald-600 text-white"
                    radius="full"
                    onPress={goNext}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    className="bg-emerald-600 text-white"
                    isLoading={isSubmitting}
                    radius="full"
                    onPress={handleSubmit}
                  >
                    Create School Account
                  </Button>
                )}
              </div>

              <Button
                as={Link}
                href="/auth/login"
                isDisabled={isSubmitting}
                radius="full"
                variant="light"
              >
                Back to Sign In
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
