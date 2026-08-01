import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const salasData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../seed/initialRooms.json'), 'utf-8')
);

const salas = salasData.salas;
const reservas = [];
let nextReservaId = 1;

const findSalaById = (id) => salas.find((sala) => sala.id === id);

const findTodasReservas = () => reservas;

const criarReserva = ({ salaId, inicio, fim, host }) => {
  const novaReserva = {
    id: nextReservaId++,
    salaId,
    inicio,
    fim,
    host,
  };
  reservas.push(novaReserva);
  return novaReserva;
};

const verificarConflito = (salaId, inicio, fim) => {
  return reservas.some((reserva) => {
    return reserva.salaId === salaId && reserva.inicio < fim && inicio < reserva.fim;
  });
};

export default {
  findSalaById,
  findTodasReservas,
  criarReserva,
  verificarConflito,
};
