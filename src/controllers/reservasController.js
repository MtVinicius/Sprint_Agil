import reservasModel from '../models/reservasModel.js';

const getReservas = (req, res) => {
  try {
    const todasReservas = reservasModel.findTodasReservas();
    return res.status(200).json(todasReservas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar reservas' });
  }
};

const postReserva = (req, res) => {
  try {
    const { salaId, inicio, fim, host } = req.body;

    if (!salaId || !inicio || !fim || !host) {
      return res.status(400).json({ error: 'Campo obrigatório ausente' });
    }

    const sala = reservasModel.findSalaById(salaId);
    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    const inicioData = new Date(inicio);
    const fimData = new Date(fim);
    if (Number.isNaN(inicioData.getTime()) || Number.isNaN(fimData.getTime()) || inicioData >= fimData) {
      return res.status(400).json({ error: 'Data inválida' });
    }

    if (reservasModel.verificarConflito(salaId, inicio, fim)) {
      return res.status(409).json({ error: 'Conflito de horário' });
    }

    const novaReserva = reservasModel.criarReserva({ salaId, inicio, fim, host });
    return res.status(201).json(novaReserva);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

export default {
  getReservas,
  postReserva,
};
