import axios from "axios";

const CASHIN_URL = "http://localhost:3000/api/cash-in";
const CASHOUT_URL = "http://localhost:3000/api/cash-out/request";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const testCashIn = async (index: number) => {
  try {
    const response = await axios.post(CASHIN_URL, {
      name: `Usuário Teste ${index}`,
      cpfCnpj: "12345678909",
      email: `teste${index}@email.com`,
      value: 10 + index,
      description: `Depósito automático ${index}`,
    });
    console.log(`✅ [CashIn ${index}] Criado:`, response.data.id);
  } catch (err: any) {
    console.error(
      `❌ [CashIn ${index}] Erro:`,
      err?.response?.data || err.message
    );
  }
};

const testCashOut = async (index: number) => {
  try {
    const response = await axios.post(CASHOUT_URL, {
      value: 5 + index,
      description: `Saque automático ${index}`,
      pixKey: "teste@email.com",
      pixKeyType: "EMAIL",
    });
    console.log(`✅ [CashOut ${index}] Solicitado:`, response.data.transferId);
  } catch (err: any) {
    console.error(
      `❌ [CashOut ${index}] Erro:`,
      err?.response?.data || err.message
    );
  }
};

const run = async () => {
  for (let i = 1; i <= 100; i++) {
    await testCashIn(i);
    await sleep(100);

    await testCashOut(i);
    await sleep(100);
  }

  console.log("🎉 Testes de CashIn e CashOut finalizados.");
};

run();
