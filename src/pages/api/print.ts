// pages/api/print.ts
import { NextApiRequest, NextApiResponse } from "next";
import SerialPort from "serialport";
const parsers = SerialPort.parsers;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const port = new SerialPort("COM4", {
      baudRate: 115200,
    });

    const commands = [
      0x1b, 0x40, 0x1b, 0x61, 0x01, 0x1d, 0x21, 0x11, 0x42, 0x42, 0x42, 0x0a,
      0x1b, 0x64, 0x02,
    ];

    // Use a `\r\n` as a line terminator
    const parser = new parsers.Readline({
      delimiter: "\r\n",
    });

    // Dados a serem enviados para a impressora
    const cupomFiscal = "Seu cupom fiscal aqui...\n";

    port.pipe(parser);

    // Abrir a porta serial e enviar os dados
    port.on("open", () => {
      console.log("Porta COM4 aberta");
      port.write(cupomFiscal, (err) => {
        if (err) {
          return console.log("Erro ao enviar dados:", err.message);
        }
        console.log("Dados enviados com sucesso");
        port.close(); // Fechar a porta após enviar os dados
      });
    });

    // Lidar com erros na abertura da porta
    port.on("error", (err) => {
      console.error("Erro ao abrir a porta COM4:", err.message);
    });

    // port.on("open", () => {
    //   console.log("Conexão com a porta COM4 estabelecida.");

    //   port.write(Buffer.from(commands), (err) => {
    //     if (err) {
    //       console.error("Erro ao escrever na porta COM4:", err);
    //       res.status(500).json({ error: "Erro ao imprimir o cupom" });
    //     } else {
    //       console.log("Cupom impresso com sucesso!");
    //       res.status(200).json({ success: true });
    //       port.close();
    //     }
    //   });
    // });

    // port.on("error", (err) => {
    //   console.error("Erro na porta COM4:", err);
    //   res.status(500).json({ error: "Erro na porta COM4" });
    // });
  } catch (error) {
    console.error("Erro ao imprimir:", error);
    res.status(500).json({ error: "Erro ao imprimir" });
  }
}
