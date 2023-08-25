// pages/api/print.ts
import { NextApiRequest, NextApiResponse } from "next";
import SerialPort from "serialport";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const port = new SerialPort("COM4", { baudRate: 115200 });

    const commands = [
      0x1b, 0x40, 0x1b, 0x61, 0x01, 0x1d, 0x21, 0x11, 0x42, 0x42, 0x42, 0x0a,
      0x1b, 0x64, 0x02,
    ];

    port.on("open", () => {
      console.log("Conexão com a porta COM4 estabelecida.");

      port.write(Buffer.from(commands), (err) => {
        if (err) {
          console.error("Erro ao escrever na porta COM4:", err);
          res.status(500).json({ error: "Erro ao imprimir o cupom" });
        } else {
          console.log("Cupom impresso com sucesso!");
          res.status(200).json({ success: true });
          port.close();
        }
      });
    });

    port.on("error", (err) => {
      console.error("Erro na porta COM4:", err);
      res.status(500).json({ error: "Erro na porta COM4" });
    });
  } catch (error) {
    console.error("Erro ao imprimir:", error);
    res.status(500).json({ error: "Erro ao imprimir" });
  }
}
