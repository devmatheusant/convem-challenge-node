"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  Id: string;
  type: "cashin" | "cashout";
  status: string;
  value: number;
  description: string;
  createdAt: string;
}

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [typeFilter, setTypeFilter] = useState<string | undefined>();

  useEffect(() => {
    let url = "/api/transactions";
    const params = new URLSearchParams();

    if (typeFilter) params.append("type", typeFilter);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [typeFilter]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          onValueChange={(value) =>
            setTypeFilter(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cashin">Cash In</SelectItem>
            <SelectItem value="cashout">Cash Out</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.Id}>
              <TableCell>{tx.Id.slice(0, 8)}...</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
              </TableCell>
              <TableCell>{tx.value.toFixed(2)}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {transactions.length === 0 && <p>Nenhuma transação encontrada</p>}
    </div>
  );
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "CONFIRMED":
    case "DONE":
    case "RECEIVED":
      return "default";
    case "PENDING":
      return "secondary";
    case "FAILED":
    case "CANCELLED":
    case "OVERDUE":
      return "destructive";
    default:
      return "outline";
  }
}
