import TransactionTable from "@/components/ui/TransactionTable";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Histórico de Transações
      </h1>
      <TransactionTable />
    </div>
  );
}
