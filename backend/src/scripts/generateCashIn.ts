import axios from "axios";

const run = async () => {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await axios.post("http://localhost:3000/api/cashin/request", {
        name: `Usuário Teste ${i + 1}`,
        cpfCnpj: "12345678909",
        email: `teste${i + 1}@email.com`,
        value: 10 + i,
        description: `Teste de depósito ${i + 1}`,
      });

      console.log(`[${i + 1}] QR Code criado:`, res.data.id);
    } catch (error: any) {
      console.error(
        `[${i + 1}] Erro ao criar QR Code:`,
        error?.response?.data || error.message
      );
    }
  }
};

run();
