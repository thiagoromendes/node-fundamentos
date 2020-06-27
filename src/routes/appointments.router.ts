import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppoitmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appoitmentRepository = new AppoitmentRepository();

appointmentsRouter.get('/', (request, response) => {
  const appoitments = appoitmentRepository.all();
  return response.json(appoitments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appoitmentRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
