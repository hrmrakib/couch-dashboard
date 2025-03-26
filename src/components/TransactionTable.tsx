"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TransactionTable() {
  const transactions = [
    { id: 1, name: "John Doe", amount: "$100", date: "2024-03-20" },
    { id: 2, name: "Jane Smith", amount: "$150", date: "2024-03-19" },
    { id: 3, name: "Mike Johnson", amount: "$200", date: "2024-03-18" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.name}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
