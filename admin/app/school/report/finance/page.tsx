"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Download, FileText, Landmark, Wallet, TrendingUp, ShieldCheck, Info } from "lucide-react";

// Helper component for section titles
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-4">
    <h3 className="text-sm font-black text-slate-700 tracking-wider whitespace-nowrap uppercase">{title}</h3>
    <Divider className="flex-1 bg-slate-200" />
  </div>
);

export default function FinancialReportPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1400px] mx-auto bg-[#fcfcfc] min-h-screen font-sans">

      {/* HEADER SECTION */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-default-200 shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-[#662d91]/10 rounded-xl text-[#662d91]">
            <Landmark size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Management</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-default-500 text-sm font-medium">FUS-DITP Report Portal</p>
              <Chip size="sm" variant="flat" color="success" className="h-5 text-[10px] font-bold uppercase tracking-wider">
                IPSAS COMPLIANT SYSTEM
              </Chip>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="bordered" className="font-semibold border-default-200">
            Preview
          </Button>
          <Button
            startContent={<Download size={18} />}
            className="font-semibold bg-[#662d91] text-white shadow-md"
          >
            Download Full Report
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-start px-8 pt-8 pb-4 bg-white">
          <h2 className="text-xl font-bold text-slate-800 uppercase">Annual Financial Statements</h2>
          <p className="text-sm text-[#662d91] font-semibold tracking-wide uppercase">
            Federal Unified School Digital Transformation Platform (FUS-DITP)
          </p>
          <p className="text-xs text-default-400 mt-1">FOR THE YEAR ENDED 31 DECEMBER 2024</p>
        </CardHeader>

        <CardBody className="px-8 pb-8 pt-0">
          <Tabs
            aria-label="IPSAS Statements"
            variant="underlined"
            classNames={{
              tabList: "gap-8 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#662d91]",
              tab: "max-w-fit px-0 h-14",
              tabContent: "group-data-[selected=true]:text-[#662d91] font-bold text-sm uppercase"
            }}
          >
            {/* 1. STATEMENT OF FINANCIAL PERFORMANCE */}
            <Tab key="perf" title={<div className="flex items-center gap-2 font-bold"><TrendingUp size={16} /> Performance</div>}>
              <div className="mt-6 space-y-8">
                <section>
                  <SectionHeader title="1. STATEMENT OF FINANCIAL PERFORMANCE" />
                  <Table removeWrapper aria-label="Financial Performance">
                    <TableHeader>
                      <TableColumn width={400}>PARTICULARS</TableColumn>
                      <TableColumn width={100}>NOTES</TableColumn>
                      <TableColumn align="end">2024 (₦)</TableColumn>
                      <TableColumn align="end">2023 (₦)</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-default-50 font-bold"><TableCell colSpan={4}>A. REVENUE</TableCell></TableRow>
                      <TableRow><TableCell>1. Government Grants and Subventions</TableCell><TableCell>1</TableCell><TableCell className="text-right font-mono">4,850,000,000</TableCell><TableCell className="text-right font-mono">3,950,000,000</TableCell></TableRow>
                      <TableRow><TableCell>2. Internally Generated Revenue</TableCell><TableCell>2</TableCell><TableCell className="text-right font-mono">820,000,000</TableCell><TableCell className="text-right font-mono">650,000,000</TableCell></TableRow>
                      <TableRow><TableCell>3. Examination and Certification Fees</TableCell><TableCell>3</TableCell><TableCell className="text-right font-mono">215,000,000</TableCell><TableCell className="text-right font-mono">180,000,000</TableCell></TableRow>
                      <TableRow><TableCell>4. ICT Service Charges</TableCell><TableCell>4</TableCell><TableCell className="text-right font-mono">145,000,000</TableCell><TableCell className="text-right font-mono">98,000,000</TableCell></TableRow>
                      <TableRow><TableCell>5. Donations and Development Support</TableCell><TableCell>5</TableCell><TableCell className="text-right font-mono">120,000,000</TableCell><TableCell className="text-right font-mono">75,000,000</TableCell></TableRow>
                      <TableRow className="font-bold border-t-2 border-slate-200"><TableCell colSpan={2}>TOTAL REVENUE</TableCell><TableCell className="text-right font-mono">6,150,000,000</TableCell><TableCell className="text-right font-mono">4,953,000,000</TableCell></TableRow>

                      <TableRow className="bg-default-50 font-bold pt-4"><TableCell colSpan={4}>B. EXPENSES</TableCell></TableRow>
                      <TableRow><TableCell>1. Staff Costs</TableCell><TableCell>6</TableCell><TableCell className="text-right font-mono">2,165,000,000</TableCell><TableCell className="text-right font-mono">1,910,000,000</TableCell></TableRow>
                      <TableRow><TableCell>2. Pension Expense</TableCell><TableCell>7</TableCell><TableCell className="text-right font-mono">215,000,000</TableCell><TableCell className="text-right font-mono">190,000,000</TableCell></TableRow>
                      <TableRow><TableCell>3. ICT Infrastructure Expenses</TableCell><TableCell>8</TableCell><TableCell className="text-right font-mono">780,000,000</TableCell><TableCell className="text-right font-mono">620,000,000</TableCell></TableRow>
                      <TableRow><TableCell>4. Software Development & Licensing</TableCell><TableCell>9</TableCell><TableCell className="text-right font-mono">540,000,000</TableCell><TableCell className="text-right font-mono">420,000,000</TableCell></TableRow>
                      <TableRow><TableCell>5. Training and Capacity Building</TableCell><TableCell>10</TableCell><TableCell className="text-right font-mono">165,000,000</TableCell><TableCell className="text-right font-mono">120,000,000</TableCell></TableRow>
                      <TableRow><TableCell>6. Maintenance and Technical Support</TableCell><TableCell>11</TableCell><TableCell className="text-right font-mono">110,000,000</TableCell><TableCell className="text-right font-mono">85,000,000</TableCell></TableRow>
                      <TableRow><TableCell>7. Utilities and Power</TableCell><TableCell>12</TableCell><TableCell className="text-right font-mono">98,000,000</TableCell><TableCell className="text-right font-mono">70,000,000</TableCell></TableRow>
                      <TableRow><TableCell>8. Security and Compliance</TableCell><TableCell>13</TableCell><TableCell className="text-right font-mono">135,000,000</TableCell><TableCell className="text-right font-mono">90,000,000</TableCell></TableRow>
                      <TableRow><TableCell>9. Monitoring and Evaluation</TableCell><TableCell>14</TableCell><TableCell className="text-right font-mono">75,000,000</TableCell><TableCell className="text-right font-mono">62,000,000</TableCell></TableRow>
                      <TableRow><TableCell>10. Administrative Expenses</TableCell><TableCell>15</TableCell><TableCell className="text-right font-mono">128,000,000</TableCell><TableCell className="text-right font-mono">101,000,000</TableCell></TableRow>
                      <TableRow className="font-bold bg-slate-900 text-white"><TableCell colSpan={2}>TOTAL EXPENSES</TableCell><TableCell className="text-right font-mono">4,411,000,000</TableCell><TableCell className="text-right font-mono">3,668,000,000</TableCell></TableRow>
                      <TableRow className="font-black h-14 bg-purple-50 text-[#662d91]"><TableCell colSpan={2}>SURPLUS FOR THE YEAR</TableCell><TableCell className="text-right font-mono underline decoration-double text-lg">1,739,000,000</TableCell><TableCell className="text-right font-mono underline decoration-double text-lg">1,285,000,000</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </section>
              </div>
            </Tab>

            {/* 2. STATEMENT OF FINANCIAL POSITION */}
            <Tab key="pos" title={<div className="flex items-center gap-2 font-bold"><Landmark size={16} /> Position</div>}>
              <div className="mt-6 space-y-6">
                <SectionHeader title="2. STATEMENT OF FINANCIAL POSITION" />
                <Table removeWrapper aria-label="Statement of Position">
                  <TableHeader>
                    <TableColumn>ASSETS / LIABILITIES</TableColumn>
                    <TableColumn>NOTES</TableColumn>
                    <TableColumn align="end">2024 (₦)</TableColumn>
                    <TableColumn align="end">2023 (₦)</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-bold bg-default-50 text-[#662d91]"><TableCell colSpan={4}>A. NON-CURRENT ASSETS</TableCell></TableRow>
                    <TableRow><TableCell>1. Property, Plant and Equipment</TableCell><TableCell>16</TableCell><TableCell className="text-right font-mono">3,950,000,000</TableCell><TableCell className="text-right font-mono">3,120,000,000</TableCell></TableRow>
                    <TableRow><TableCell>2. Intangible Assets (Software)</TableCell><TableCell>17</TableCell><TableCell className="text-right font-mono">1,180,000,000</TableCell><TableCell className="text-right font-mono">850,000,000</TableCell></TableRow>
                    <TableRow><TableCell>3. Right-of-Use Assets</TableCell><TableCell>18</TableCell><TableCell className="text-right font-mono">240,000,000</TableCell><TableCell className="text-right font-mono">180,000,000</TableCell></TableRow>
                    <TableRow className="font-bold bg-slate-100"><TableCell colSpan={2}>Total Non-Current Assets</TableCell><TableCell className="text-right font-mono">5,370,000,000</TableCell><TableCell className="text-right font-mono">4,150,000,000</TableCell></TableRow>

                    <TableRow className="font-bold bg-default-50 text-[#662d91]"><TableCell colSpan={4}>B. CURRENT ASSETS</TableCell></TableRow>
                    <TableRow><TableCell>1. Cash and Cash Equivalents</TableCell><TableCell>19</TableCell><TableCell className="text-right font-mono">1,850,000,000</TableCell><TableCell className="text-right font-mono">1,250,000,000</TableCell></TableRow>
                    <TableRow><TableCell>2. Accounts Receivable</TableCell><TableCell>20</TableCell><TableCell className="text-right font-mono">320,000,000</TableCell><TableCell className="text-right font-mono">205,000,000</TableCell></TableRow>
                    <TableRow><TableCell>3. Prepayments</TableCell><TableCell>21</TableCell><TableCell className="text-right font-mono">85,000,000</TableCell><TableCell className="text-right font-mono">60,000,000</TableCell></TableRow>
                    <TableRow><TableCell>4. Inventories</TableCell><TableCell>22</TableCell><TableCell className="text-right font-mono">45,000,000</TableCell><TableCell className="text-right font-mono">30,000,000</TableCell></TableRow>
                    <TableRow className="font-bold bg-slate-100"><TableCell colSpan={2}>Total Current Assets</TableCell><TableCell className="text-right font-mono">2,300,000,000</TableCell><TableCell className="text-right font-mono">1,545,000,000</TableCell></TableRow>

                    <TableRow className="font-black h-12 bg-purple-100"><TableCell colSpan={2}>TOTAL ASSETS</TableCell><TableCell className="text-right font-mono">7,670,000,000</TableCell><TableCell className="text-right font-mono">5,695,000,000</TableCell></TableRow>

                    <TableRow className="font-bold bg-default-50 text-[#662d91]"><TableCell colSpan={4}>C. LIABILITIES</TableCell></TableRow>
                    <TableRow><TableCell>1. Accounts Payable</TableCell><TableCell>23</TableCell><TableCell className="text-right font-mono">420,000,000</TableCell><TableCell className="text-right font-mono">290,000,000</TableCell></TableRow>
                    <TableRow><TableCell>2. Accrued Expenses</TableCell><TableCell>24</TableCell><TableCell className="text-right font-mono">165,000,000</TableCell><TableCell className="text-right font-mono">110,000,000</TableCell></TableRow>
                    <TableRow><TableCell>3. Pension Liabilities</TableCell><TableCell>25</TableCell><TableCell className="text-right font-mono">95,000,000</TableCell><TableCell className="text-right font-mono">80,000,000</TableCell></TableRow>
                    <TableRow><TableCell>4. Deferred Revenue</TableCell><TableCell>26</TableCell><TableCell className="text-right font-mono">210,000,000</TableCell><TableCell className="text-right font-mono">145,000,000</TableCell></TableRow>
                    <TableRow className="font-bold bg-slate-100 border-b-2 border-slate-300"><TableCell colSpan={2}>Total Liabilities</TableCell><TableCell className="text-right font-mono">890,000,000</TableCell><TableCell className="text-right font-mono">625,000,000</TableCell></TableRow>

                    <TableRow className="font-black bg-slate-900 text-white"><TableCell colSpan={2}>TOTAL LIABILITIES AND NET ASSETS</TableCell><TableCell className="text-right font-mono">7,670,000,000</TableCell><TableCell className="text-right font-mono">5,695,000,000</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </Tab>

            {/* 3. STATEMENT OF CASH FLOWS */}
            <Tab key="cash" title={<div className="flex items-center gap-2 font-bold"><Wallet size={16} /> Cash Flows</div>}>
              <div className="mt-6 space-y-6">
                <SectionHeader title="3. STATEMENT OF CASH FLOWS" />
                <Table removeWrapper aria-label="Statement of Cash Flows">
                  <TableHeader>
                    <TableColumn>PARTICULARS</TableColumn>
                    <TableColumn>NOTES</TableColumn>
                    <TableColumn align="end">2024 (₦)</TableColumn>
                    <TableColumn align="end">2023 (₦)</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-bold bg-default-50"><TableCell colSpan={4}>A. CASH FLOWS FROM OPERATING ACTIVITIES</TableCell></TableRow>
                    <TableRow><TableCell colSpan={2}>Cash received from Government Grants</TableCell><TableCell className="text-right font-mono">4,820,000,000</TableCell><TableCell className="text-right font-mono">3,920,000,000</TableCell></TableRow>
                    <TableRow><TableCell colSpan={2}>Cash received from IGR and Other Sources</TableCell><TableCell className="text-right font-mono">1,080,000,000</TableCell><TableCell className="text-right font-mono">850,000,000</TableCell></TableRow>
                    <TableRow><TableCell colSpan={2}>Cash paid to Suppliers and Employees</TableCell><TableCell className="text-right font-mono text-danger">(3,495,000,000)</TableCell><TableCell className="text-right font-mono text-danger">(2,850,000,000)</TableCell></TableRow>
                    <TableRow><TableCell colSpan={2}>Cash paid for Operations and Overheads</TableCell><TableCell className="text-right font-mono text-danger">(820,000,000)</TableCell><TableCell className="text-right font-mono text-danger">(600,000,000)</TableCell></TableRow>
                    <TableRow className="font-bold border-t border-divider"><TableCell colSpan={2}>Net Cash from Operating Activities</TableCell><TableCell className="text-right font-mono">1,585,000,000</TableCell><TableCell className="text-right font-mono">1,320,000,000</TableCell></TableRow>

                    <TableRow className="font-bold bg-default-50 pt-4"><TableCell colSpan={4}>B. CASH FLOWS FROM INVESTING ACTIVITIES</TableCell></TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Purchase of Property, Plant and Equipment</TableCell>
                      <TableCell className="text-right font-mono text-danger">(1,250,000,000)</TableCell>
                      <TableCell className="text-right font-mono text-danger">(950,000,000)</TableCell>
                    </TableRow>
                    <TableRow><TableCell colSpan={2}>Purchase of Intangible Assets (Software)</TableCell><TableCell className="text-right font-mono text-danger">(420,000,000)</TableCell><TableCell className="text-right font-mono text-danger">(310,000,000)</TableCell></TableRow>
                    <TableRow><TableCell colSpan={2}>Proceeds from Disposal of Assets</TableCell>
                    <TableCell className="text-right font-mono">20,000,000</TableCell>
                    <TableCell className="text-right font-mono">15,000,000</TableCell></TableRow>
                    <TableRow className="font-bold border-t border-divider"><TableCell colSpan={2}>Net Cash Used in Investing Activities</TableCell><TableCell className="text-right font-mono text-danger">(1,650,000,000)</TableCell><TableCell className="text-right font-mono text-danger">(1,245,000,000)</TableCell></TableRow>

                    <TableRow className="font-black bg-slate-900 text-white h-14 border-t-4 border-[#662d91]">
                      <TableCell colSpan={2}>CASH AND CASH EQUIVALENTS AT 31 DECEMBER</TableCell>
                      <TableCell className="text-right font-mono">1,850,000,000</TableCell>
                      <TableCell className="text-right font-mono">1,675,000,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* FOOTER POLICIES & COMPLIANCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <Card className="bg-slate-50 border-none">
          <CardBody className="p-6">
            <h5 className="flex items-center gap-2 font-bold text-slate-700 mb-3 uppercase text-xs tracking-widest">
              <ShieldCheck size={16} className="text-success" />
              IPSAS Compliance Statement
            </h5>
            <p className="text-xs text-default-600 leading-relaxed">
              These financial statements have been prepared in accordance with the International Public Sector Accounting Standards (IPSAS) on an accrual basis. Revenue is recognized when control of the asset is transferred, and Property, Plant and Equipment are stated at cost less accumulated depreciation.
            </p>
          </CardBody>
        </Card>

        <Card className="bg-purple-50 border-none">
          <CardBody className="p-6 flex flex-col justify-center items-center text-center">
            <Info size={24} className="text-[#662d91] mb-2" />
            <p className="text-sm font-bold text-[#662d91]">Digital Ledger Verification</p>
            <p className="text-[10px] text-[#662d91]/70 mt-1 max-w-[250px]">
              This statement is generated via the FUS-DITP URMS System. Automated audit trail logs are attached to the PDF export.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}