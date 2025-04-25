// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useTransactionsQuery } from "@/redux/features/userApi/userSlice";

// export function TransactionTable() {
//   const { data } = useTransactionsQuery(undefined);
//   const user = data?.data ;
//   console.log(user)


//   const transactions = [
//     { id: 1, name: "John Doe", amount: "$100", date: "2024-03-20" },
//     { id: 2, name: "Jane Smith", amount: "$150", date: "2024-03-19" },
//     { id: 3, name: "Mike Johnson", amount: "$200", date: "2024-03-18" },
//   ];

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Name</TableHead>
//           <TableHead>Amount</TableHead>
//           <TableHead>Date</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {transactions.map((transaction) => (
//           <TableRow key={transaction.id}>
//             <TableCell>{transaction.name}</TableCell>
//             <TableCell>{transaction.amount}</TableCell>
//             <TableCell>{transaction.date}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }


"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactionsQuery } from "@/redux/features/userApi/userSlice";

interface Transaction {
  _id: string;
  transaction_id: string;
  user: {
    name: string;
    email: string;
  };
  amount: number;
  payment_method: string;
  transaction_type: string;
  createdAt: string;
}

export function TransactionTable() {
  const { data, isLoading, isError } = useTransactionsQuery(undefined);
  const transactions = data?.data || [];

  if (isLoading) {
    return <div className="p-4 text-center">Loading transactions...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error loading transactions</div>;
  }

  if (transactions.length === 0) {
    return <div className="p-4 text-center">No transactions found</div>;
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format amount as currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100); // Assuming amount is in cents
  };

  return (
    <Table>
      <TableHeader className="bg-black text-white">
        <TableRow>
          <TableHead className="text-white">User</TableHead>
          <TableHead className="text-white">Transaction ID</TableHead>
          <TableHead className="text-white">Amount</TableHead>
          <TableHead className="text-white">Payment Method</TableHead>
          <TableHead className="text-white">Type</TableHead>
          <TableHead className="text-white">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => (
          <TableRow key={transaction._id}>
            <TableCell className="font-medium">
              {transaction.user?.name || 'N/A'}
            </TableCell>
            <TableCell className="font-mono text-sm">
              {transaction.transaction_id}
            </TableCell>
            <TableCell>
              {formatAmount(transaction.amount)}
            </TableCell>
            <TableCell className="capitalize">
              {transaction.payment_method}
            </TableCell>
            <TableCell className="capitalize">
              {transaction.transaction_type}
            </TableCell>
            <TableCell>
              {formatDate(transaction.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}