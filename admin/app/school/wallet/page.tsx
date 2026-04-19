"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Plus,
  Send,
  History,
} from "lucide-react";

const walletData = {
  balance: "NGN 524,300",
  accountNumber: "1234567890",
};

const transactions = [
  {
    id: 1,
    type: "credit",
    description: "Payment for Tuition Fee",
    amount: "NGN 50,000",
    date: "2024-04-15",
    status: "Completed",
    reference: "TXN001234",
  },
  {
    id: 2,
    type: "debit",
    description: "Refund - Transport Fee",
    amount: "NGN 5,000",
    date: "2024-04-12",
    status: "Completed",
    reference: "TXN001233",
  },
  {
    id: 3,
    type: "credit",
    description: "Payment for Books & Materials",
    amount: "NGN 35,000",
    date: "2024-04-10",
    status: "Completed",
    reference: "TXN001232",
  },
  {
    id: 4,
    type: "debit",
    description: "Scholarship Credit",
    amount: "NGN 20,000",
    date: "2024-04-08",
    status: "Pending",
    reference: "TXN001231",
  },
  {
    id: 5,
    type: "credit",
    description: "Payment for Examination Fee",
    amount: "NGN 15,000",
    date: "2024-04-05",
    status: "Completed",
    reference: "TXN001230",
  },
];

export default function WalletPage() {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [addFundsForm, setAddFundsForm] = useState({
    amount: "",
    paymentMethod: "bank-transfer",
  });
  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    bankName: "",
    accountNumber: "",
  });

  const handleAddFundsChange = (key: string, value: string) => {
    setAddFundsForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleWithdrawChange = (key: string, value: string) => {
    setWithdrawForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddFunds = () => {
    if (!addFundsForm.amount) {
      addToast({
        title: "Missing Amount",
        description: "Please enter an amount to add.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    addToast({
      title: "Success",
      description: `NGN ${addFundsForm.amount} has been added to your wallet.`,
      color: "success",
      closeIcon: true,
    });

    setShowAddFunds(false);
    setAddFundsForm({ amount: "", paymentMethod: "bank-transfer" });
  };

  const handleWithdraw = () => {
    if (!withdrawForm.amount || !withdrawForm.bankName || !withdrawForm.accountNumber) {
      addToast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    addToast({
      title: "Success",
      description: `Withdrawal of NGN ${withdrawForm.amount} has been initiated.`,
      color: "success",
      closeIcon: true,
    });

    setShowWithdraw(false);
    setWithdrawForm({ amount: "", bankName: "", accountNumber: "" });
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 border-0">
        <CardBody className="py-8 px-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-2">Wallet Balance</p>
              <h1 className="text-white text-4xl font-bold">{walletData.balance}</h1>
              <p className="text-white/70 text-xs mt-3">
                Account: {walletData.accountNumber}
              </p>
            </div>
            <Wallet className="w-12 h-12 text-white/30" />
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              className="bg-white text-emerald-600 font-semibold"
              onPress={() => setShowAddFunds(true)}
              startContent={<Plus className="w-4 h-4" />}
            >
              Add Funds
            </Button>
            <Button
              className="bg-white/20 text-white font-semibold border border-white/30"
              onPress={() => setShowWithdraw(true)}
              startContent={<Send className="w-4 h-4" />}
            >
              Withdraw
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="py-4 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-default-500 text-sm">Total Paid</p>
                <p className="text-2xl font-bold text-emerald-600">NGN 165.4M</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-emerald-600/30" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-default-500 text-sm">Total Refunded</p>
                <p className="text-2xl font-bold text-blue-600">NGN 12.3M</p>
              </div>
              <ArrowDownLeft className="w-8 h-8 text-blue-600/30" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-default-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-amber-600">NGN 2.5M</p>
              </div>
              <History className="w-8 h-8 text-amber-600/30" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader className="flex gap-3 pb-4">
          <History className="w-5 h-5 text-default-500" />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Transaction History</p>
            <p className="text-sm text-default-500">Recent wallet activities</p>
          </div>
        </CardHeader>
        <CardBody className="divide-y">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`p-3 rounded-lg ${
                    transaction.type === "credit"
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-blue-100 dark:bg-blue-900/30"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft
                      className={`w-5 h-5 ${
                        transaction.type === "credit"
                          ? "text-emerald-600"
                          : "text-blue-600"
                      }`}
                    />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{transaction.description}</p>
                  <p className="text-xs text-default-500">{transaction.date}</p>
                  <p className="text-xs text-default-400">{transaction.reference}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "credit"
                      ? "text-emerald-600"
                      : "text-blue-600"
                  }`}>
                    {transaction.type === "credit" ? "+" : "-"}{transaction.amount}
                  </p>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      transaction.status === "Completed"
                        ? "success"
                        : "warning"
                    }
                  >
                    {transaction.status}
                  </Chip>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Add Funds Modal */}
      <Modal isOpen={showAddFunds} onOpenChange={setShowAddFunds}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3">
                <Plus className="w-5 h-5" />
                <div>
                  <p>Add Funds to Wallet</p>
                  <p className="text-sm text-default-500 font-normal">
                    Choose a payment method and amount
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="gap-4">
                <Input
                  label="Amount (NGN)"
                  placeholder="Enter amount"
                  type="number"
                  value={addFundsForm.amount}
                  onValueChange={(value) => handleAddFundsChange("amount", value)}
                  startContent={<span className="text-default-400">₦</span>}
                />
                <Select
                  label="Payment Method"
                  value={addFundsForm.paymentMethod}
                  onChange={(e) =>
                    handleAddFundsChange("paymentMethod", e.target.value)
                  }
                >
                  <SelectItem key="bank-transfer">
                    Bank Transfer
                  </SelectItem>
                  <SelectItem key="card">
                    Credit/Debit Card
                  </SelectItem>
                  <SelectItem key="ussd">
                    USSD
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-emerald-600 text-white"
                  onPress={() => {
                    handleAddFunds();
                    onClose();
                  }}
                >
                  Add Funds
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Withdraw Modal */}
      <Modal isOpen={showWithdraw} onOpenChange={setShowWithdraw}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3">
                <Send className="w-5 h-5" />
                <div>
                  <p>Withdraw Funds</p>
                  <p className="text-sm text-default-500 font-normal">
                    Provide your bank details
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="gap-4">
                <Input
                  label="Amount (NGN)"
                  placeholder="Enter amount"
                  type="number"
                  value={withdrawForm.amount}
                  onValueChange={(value) => handleWithdrawChange("amount", value)}
                  startContent={<span className="text-default-400">₦</span>}
                />
                <Input
                  label="Bank Name"
                  placeholder="e.g., First Bank, GTBank"
                  value={withdrawForm.bankName}
                  onValueChange={(value) => handleWithdrawChange("bankName", value)}
                />
                <Input
                  label="Account Number"
                  placeholder="Enter your bank account number"
                  value={withdrawForm.accountNumber}
                  onValueChange={(value) =>
                    handleWithdrawChange("accountNumber", value)
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-emerald-600 text-white"
                  onPress={() => {
                    handleWithdraw();
                    onClose();
                  }}
                >
                  Confirm Withdrawal
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
