// pages/api/list-ports.ts
import { NextApiRequest, NextApiResponse } from "next";
const SerialPort = require("serialport");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ports = await SerialPort.list();

    console.log("portas", ports);

    res.status(200).json(ports);
  } catch (error) {
    console.error("Erro ao listar as portas seriais:", error);
    res.status(500).json({ error: "Erro ao listar as portas seriais" });
  }
}
