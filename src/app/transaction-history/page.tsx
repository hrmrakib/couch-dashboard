"use client";

import { useState } from "react";
import { ArrowLeft, Info, X, Download } from "lucide-react";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionsQuery } from "@/redux/features/userApi/userSlice";
import { usePDF } from "react-to-pdf";
import Loading from "@/components/loading/Loading";

// Items per page
const ITEMS_PER_PAGE = 10;

interface Transaction {
  transaction_id: string;
  user?: {
    name: string;
    email: string;
  };
  amount: number;
  transaction_type: string;
  payment_method: string;
  createdAt: string;
}

// Utility function for CSV download
const downloadCSV = (data: Transaction | Transaction[], filename: string) => {
  const headers = [
    "Transaction ID",
    "User Name",
    "Email",
    "Amount",
    "Type",
    "Payment Method",
    "Date",
  ];

  // Convert single transaction to array if needed
  const dataArray = Array.isArray(data) ? data : [data];

  const csvContent = [
    headers.join(","),
    ...dataArray.map((transaction: Transaction) =>
      [
        `"${transaction.transaction_id}"`,
        `"${transaction.user?.name || "N/A"}"`,
        `"${transaction.user?.email || "N/A"}"`,
        `"${transaction.amount}"`,
        `"${transaction.transaction_type}"`,
        `"${transaction.payment_method}"`,
        `"${new Date(transaction.createdAt).toLocaleDateString()}"`,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function TransactionDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Transaction | null>(null);
  const { targetRef } = usePDF({
    filename: `transaction_${selectedUser?.transaction_id || "details"}.pdf`,
  });

  const {
    data: transactionsData,
    isLoading,
    isError,
  } = useTransactionsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const totalPages = transactionsData?.meta?.pagination?.totalPages || 1;
  const totalEarnings = transactionsData?.meta?.total?.earnings || "0.00";
  const totalBuys = transactionsData?.meta?.total?.buys || "0.00";
  const totalSells = transactionsData?.meta?.total?.sells || "0.00";

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(page.toString());
    }
  };

  // Handle go to page
  const handleGoToPage = () => {
    const pageNumber = Number.parseInt(inputPage);
    if (!isNaN(pageNumber)) {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      } else {
        setInputPage(currentPage.toString());
      }
    }
  };

  // Handle opening transaction details modal
  const handleOpenTransactionDetails = (transaction: Transaction) => {
    setSelectedUser(transaction);
    setIsModalOpen(true);
  };

  // Download all transactions as CSV
  const handleDownloadAllTransactions = () => {
    if (transactionsData?.data) {
      downloadCSV(transactionsData.data, "all_transactions.csv");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className='flex min-h-screen bg-white w-full'>
        <main className='flex-1 p-6'>
          <div className='flex justify-center items-center h-full text-red-500'>
            <p>Error loading transaction data</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <ArrowLeft className='h-5 w-5 mr-2' />
          <h1 className='text-xl md:text-[32px] text-[#1010100] font-semibold'>
            Overview
          </h1>
        </div>
        <Button
          variant='outline'
          className='bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2'
          onClick={handleDownloadAllTransactions}
        >
          <Download className='h-4 w-4' />
          Export All
        </Button>
      </div>

      {/* Earnings Cards */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className='bg-white border border-gray-200 flex flex-col items-center justify-center rounded-lg p-4'>
          <div className='text-[#737163] text-2xl font-medium mb-1'>
            Total Earnings
          </div>
          <div className='text-3xl md:text-[48px] text-[#1A1918] font-bold'>
            ${totalEarnings}
          </div>
        </div>
        <div className='bg-white border border-gray-200 flex flex-col items-center justify-center rounded-lg p-4'>
          <div className='text-[#737163] text-2xl font-medium mb-1'>
            Total Buys
          </div>
          <div className='text-3xl md:text-[48px] text-[#1A1918] font-bold'>
            ${totalBuys}
          </div>
        </div>
        <div className='bg-white border border-gray-200 flex flex-col items-center justify-center rounded-lg p-4'>
          <div className='text-[#737163] text-2xl font-medium mb-1'>
            Total Sells
          </div>
          <div className='text-3xl md:text-[48px] text-[#1A1918] font-bold'>
            ${totalSells}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className='mb-6'>
        <h2 className='text-2xl font-medium text-[#333333] mb-4'>
          Transaction History
        </h2>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            {/* Table Header */}
            <thead>
              <tr className='bg-gray-800 text-[#FFFFFF]'>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  Transaction ID
                </th>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  User
                </th>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  Email
                </th>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  Amount
                </th>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  Type
                </th>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  Date
                </th>
                <th className='py-3 px-4 text-center font-medium text-sm'>
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {transactionsData?.data?.map((transaction: Transaction) => (
                <tr
                  key={transaction.transaction_id}
                  className='border-b border-gray-200 hover:bg-gray-50 text-[#333333]'
                >
                  <td className='py-4 text-center px-4 text-base'>
                    {transaction.transaction_id}
                  </td>
                  <td className='py-4 text-center px-4 text-base'>
                    {transaction.user?.name || "N/A"}
                  </td>
                  <td className='py-4 text-center px-4 text-base'>
                    {transaction.user?.email || "N/A"}
                  </td>
                  <td className='py-4 text-center px-4 text-base'>
                    ${transaction.amount}
                  </td>
                  <td className='py-4 text-center px-4 text-base capitalize'>
                    {transaction.transaction_type}
                  </td>
                  <td className='py-4 text-center px-4 text-base'>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className='py-4 text-center px-4 text-base'>
                    <button
                      className='text-gray-500 hover:text-gray-700'
                      onClick={() => handleOpenTransactionDetails(transaction)}
                    >
                      <Info className='h-5 w-5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='bg-gray-800 text-white hover:bg-gray-700 rounded px-4'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft className='h-4 w-4 mr-1' />
            Back
          </Button>

          <PaginationContent className='flex items-center'>
            {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    i + 1 === currentPage ? "bg-gray-800 text-white" : "border"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 3 && (
              <>
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink
                    className='w-8 h-8 flex items-center justify-center rounded border'
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
          </PaginationContent>

          <Button
            variant='outline'
            className='bg-gray-800 text-white hover:bg-gray-700 rounded px-4'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowLeft className='h-4 w-4 ml-1 rotate-180' />
          </Button>
        </div>

        <div className='flex items-center space-x-2'>
          <span className='text-sm'>Page</span>
          <Input
            className='w-16 h-8 text-center'
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
          />
          <Button
            variant='outline'
            className='h-8 px-3'
            onClick={handleGoToPage}
          >
            Go
          </Button>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedUser && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className='sm:max-w-md p-0 overflow-hidden'>
            <div className='relative'>
              <DialogHeader className='p-6 pb-0'>
                <DialogTitle className='text-xl font-semibold text-center'>
                  Transaction Details
                </DialogTitle>
              </DialogHeader>
              <button
                className='absolute right-4 top-4 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
                onClick={() => setIsModalOpen(false)}
              >
                <X className='h-4 w-4' />
              </button>
            </div>

            <div ref={targetRef} className='p-6 pt-4 space-y-4'>
              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>Transaction ID:</span>
                  <span className='font-medium'>
                    {selectedUser.transaction_id}
                  </span>
                </div>
              </div>

              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>Date</span>
                  <span className='font-medium'>
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>User Name</span>
                  <span className='font-medium'>
                    {selectedUser.user?.name || "N/A"}
                  </span>
                </div>
              </div>

              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>User Email</span>
                  <span className='font-medium'>
                    {selectedUser.user?.email || "N/A"}
                  </span>
                </div>
              </div>

              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>Transaction Amount</span>
                  <span className='font-medium'>${selectedUser.amount}</span>
                </div>
              </div>

              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>Transaction Type</span>
                  <span className='font-medium capitalize'>
                    {selectedUser.transaction_type}
                  </span>
                </div>
              </div>

              <div className='border-b pb-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-700'>Payment Method</span>
                  <span className='font-medium capitalize'>
                    {selectedUser.payment_method}
                  </span>
                </div>
              </div>
            </div>

            <div className='p-6 pt-0 flex gap-2'>
              <Button
                variant='outline'
                className='w-full bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2'
                onClick={() =>
                  downloadCSV(
                    selectedUser,
                    `transaction_${selectedUser.transaction_id}.csv`
                  )
                }
              >
                <Download className='h-4 w-4' />
                Download CSV
              </Button>
              {/* <Button 
                className='w-full bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2'
                onClick={() => toPDF()}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button> */}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
