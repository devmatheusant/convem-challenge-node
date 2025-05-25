import axios from "axios";

const run = async () => {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cash-out/request",
        {
          value: 10 + i,
          description: `Teste de saque ${i + 1}`,
          pixKey: "chave-evp-teste@pix.com",
          pixKeyType: "EMAIL",
        }
      );

      console.log(`[${i + 1}] Transferência solicitada:`, res.data.transferId);
    } catch (error: any) {
      console.error(
        `[${i + 1}] Erro ao solicitar transferência:`,
        error?.response?.data || error.message
      );
    }
  }
};

run();
