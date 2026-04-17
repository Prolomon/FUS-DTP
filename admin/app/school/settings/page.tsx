"use client";

"use client";

import { useState } from "react";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Checkbox } from "@heroui/checkbox";

export default function SchoolSettingsPage() {
  const [formData, setFormData] = useState({
    academicSession: "",
    term: "first",
    installmentSplit: "20-40-40",
    parentNotif: true,
    studentPortal: true,
    staffPortal: true,
    stopStudent: false,
    stopPayment: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    action: "change",
    newPassword: "",
    confirmPassword: "",
  });

  const [pinForm, setPinForm] = useState({
    action: "change",
    newPin: "",
    confirmPin: "",
  });

  const [factorForm, setFactorForm] = useState({
    twoFactor: false,
    code: "",
  });

  const [isShow, setIsShow] = useState(false);

  const handleFormChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (key: keyof typeof passwordForm, value: any) => {
    setPasswordForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePinChange = (key: keyof typeof pinForm, value: any) => {
    setPinForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving settings:", formData);
      await new Promise((resolve) => setTimeout(resolve, 800));
      addToast({ title: "Successfully!", description: "Settings saved successfully.", variant: "solid", color: "success", closeIcon: true, timeout: 2000, });
    } catch (e) {
      addToast({ title: "Failed to save settings. Please try again.", description: "An error occurred while saving settings.", variant: "bordered", color: "danger", closeIcon: true, timeout: 2000, });
    }
  };

  const handlePasswordSave = async () => {
    try {
      console.log("Password form:", passwordForm);
      await new Promise((resolve) => setTimeout(resolve, 800));
      addToast({ title: "Password updated!", description: "The password has been updated successfully.", variant: "solid", color: "success", closeIcon: true, timeout: 2000, });
    } catch (e) {
      addToast({ title: "Failed to update password.", description: "An error occurred while updating the password.", variant: "bordered", color: "danger", closeIcon: true, timeout: 2000, });
    }
  };

  const handlePinSave = async () => {
    try {
      console.log("Pin form:", pinForm);
      await new Promise((resolve) => setTimeout(resolve, 800));
      addToast({ title: "Pin updated!", description: "The pin has been updated successfully.", variant: "solid", color: "success", closeIcon: true, timeout: 2000, });
    } catch (e) {
      addToast({ title: "Failed to update pin.", description: "An error occurred while updating the pin.", variant: "bordered", color: "danger", closeIcon: true, timeout: 2000, });
    }
  };

  const handleResetPassword = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      addToast({ title: "Password reset successfully!", description: "The password has been reset successfully.", variant: "solid", color: "success", closeIcon: true, timeout: 2000, });
    } catch (e) {
      addToast({ title: "Failed to reset password.", description: "An error occurred while resetting the password.", variant: "bordered", color: "danger", closeIcon: true, timeout: 2000, });
    }
  };

  const handleResetPin = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      addToast({ title: "Pin reset successfully!", description: "The pin has been reset successfully.", variant: "solid", color: "success", closeIcon: true, timeout: 2000, });
    } catch (e) {
      addToast({ title: "Failed to reset pin.", description: "An error occurred while resetting the pin.", variant: "bordered", color: "danger", closeIcon: true, timeout: 2000, });
    }
  };

  const handleFactorSave = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      addToast({ title: "Two-factor authentication updated!", description: "The two-factor authentication has been updated successfully.", variant: "solid", color: "success", closeIcon: true, timeout: 2000, });
    } catch (e) {
      addToast({ title: "Failed to update two-factor authentication.", description: "An error occurred while updating the two-factor authentication.", variant: "bordered", color: "danger", closeIcon: true, timeout: 2000, });
    }
  };
 
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Configuration</p>
            <h2 className="text-2xl font-semibold">School Settings</h2>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-6 pb-6">
          <Input
            label="Academic Session"
            labelPlacement="outside"
            placeholder="2025/2026"
            size="lg"
            value={formData.academicSession}
            onChange={e => handleFormChange("academicSession", e.target.value)}
          />
          <Select
            selectedKeys={[formData.term]}
            label="Term"
            labelPlacement="outside"
            placeholder="Select term"
            size="lg"
            onSelectionChange={keys => handleFormChange("term", Array.from(keys)[0] as string)}
          >
            <SelectItem key="first">First</SelectItem>
            <SelectItem key="second">Second</SelectItem>
            <SelectItem key="third">Third</SelectItem>
          </Select>
          <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-4 dark:border-white/10 dark:bg-slate-900/35">
            <Switch isSelected={formData.parentNotif} onValueChange={val => handleFormChange("parentNotif", val)}>Enable Parent Notifications</Switch>
            <p className="mt-1 text-sm text-foreground/70">Automatically notify guardians about attendance and results.</p>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-4 dark:border-white/10 dark:bg-slate-900/35">
            <Switch isSelected={formData.studentPortal} onValueChange={val => handleFormChange("studentPortal", val)}>Allow Student Portal Access</Switch>
            <p className="mt-1 text-sm text-foreground/70">Grant students secure access to profile, fees, and report cards.</p>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-4 dark:border-white/10 dark:bg-slate-900/35">
            <Switch isSelected={formData.staffPortal} onValueChange={val => handleFormChange("staffPortal", val)}>Allow Staff Portal Access</Switch>
            <p className="mt-1 text-sm text-foreground/70">Grant staff members secure access to their profiles and related information.</p>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-4 dark:border-white/10 dark:bg-slate-900/35">
            <Switch isSelected={formData.stopStudent} onValueChange={val => handleFormChange("stopStudent", val)}>Stop Accepting Student</Switch>
            <p className="mt-1 text-sm text-foreground/70">Prevent new student registrations.</p>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-4 dark:border-white/10 dark:bg-slate-900/35">
            <Switch isSelected={formData.stopPayment} onValueChange={val => handleFormChange("stopPayment", val)}>Stop Accepting Payments</Switch>
            <p className="mt-1 text-sm text-foreground/70">Prevent new payment submissions.</p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end px-6 pb-6">
          <Button className="bg-emerald-600 text-white" radius="full" size="lg" onPress={handleSave}>
            Save Settings
          </Button>
        </CardFooter>
      </Card>
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Security</p>
            <h2 className="text-2xl font-semibold">Password Settings</h2>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-6 pb-6">
          <Select
            selectedKeys={[passwordForm.action]}
            label="Action"
            labelPlacement="outside"
            placeholder="Select action"
            size="lg"
            onSelectionChange={keys => handlePasswordChange("action", Array.from(keys)[0] as string)}
          >
            <SelectItem key="change">Change Password</SelectItem>
            <SelectItem key="reset">Reset Password</SelectItem>
          </Select>
          {passwordForm.action === "change" && (<>
            <Input
              label="New Password"
              type={isShow ? "text" : "password"}
              size="lg"
              value={passwordForm.newPassword}
              onChange={e => handlePasswordChange("newPassword", e.target.value)}
            />
            <Input
              label="Confirm New Password"
              type={isShow ? "text" : "password"}
              size="lg"
              value={passwordForm.confirmPassword}
              onChange={e => handlePasswordChange("confirmPassword", e.target.value)}
            />

            <Checkbox defaultSelected isSelected={isShow} onValueChange={setIsShow} size="lg">Show Password</Checkbox>
          </>)}
        </CardBody>
        <CardFooter className="flex justify-end px-6 pb-6">
          <Button className="bg-emerald-600 text-white" radius="full" size="lg" onPress={passwordForm.action === "change" ? handlePasswordSave : handleResetPassword}>
            {passwordForm.action === "change" ? "Change Password" : "Reset Password"}
          </Button>
        </CardFooter>
      </Card>
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Security</p>
            <h2 className="text-2xl font-semibold">Pin Configuration</h2>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-6 pb-6">
          <Select
            selectedKeys={[pinForm.action]}
            label="Action"
            labelPlacement="outside"
            placeholder="Select action"
            size="lg"
            onSelectionChange={keys => handlePinChange("action", Array.from(keys)[0] as string)}
          >
            <SelectItem key="change">Change Pin</SelectItem>
            <SelectItem key="reset">Reset Pin</SelectItem>
          </Select>
          {pinForm.action === "change" && (<>
            <Input
              label="New Pin"
              type={isShow ? "text" : "password"}
              size="lg"
              value={pinForm.newPin}
              onChange={e => handlePinChange("newPin", e.target.value)}
            />
            <Input
              label="Confirm New Pin"
              type={isShow ? "text" : "password"}
              size="lg"
              value={pinForm.confirmPin}
              onChange={e => handlePinChange("confirmPin", e.target.value)}
            />

            <Checkbox defaultSelected isSelected={isShow} onValueChange={setIsShow} size="lg">Show Pin</Checkbox>
          </>)}
        </CardBody>
        <CardFooter className="flex justify-end px-6 pb-6">
          <Button className="bg-emerald-600 text-white" radius="full" size="lg" onPress={pinForm.action === "change" ? handlePinSave : handleResetPin}>
            {pinForm.action === "change" ? "Change Pin" : "Reset Pin"}
          </Button>
        </CardFooter>
      </Card>
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Two-Factor Authentication</p>
            <h2 className="text-2xl font-semibold">Configure for Two-Factor</h2>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-6 pb-6">
          <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-4 dark:border-white/10 dark:bg-slate-900/35">
            <Switch isSelected={factorForm.twoFactor} onValueChange={val => setFactorForm(prev => ({ ...prev, twoFactor: val }))}>Two-Factor Authentication</Switch>
            <p className="mt-1 text-sm text-foreground/70">Enable two-factor authentication for all users.</p>
          </div>
          <Input
            label="Code for Two-Factor Authentication"
            labelPlacement="outside"
            placeholder="********"
            size="lg"
            value={factorForm.code}
            onChange={e => setFactorForm(prev => ({ ...prev, code: e.target.value }))}
          />
        </CardBody>
        <CardFooter className="flex justify-end px-6 pb-6">
          <Button className="bg-emerald-600 text-white" radius="full" size="lg" onPress={handleFactorSave}>
            Activate Settings
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
