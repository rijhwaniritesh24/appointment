import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import moment from 'moment';
import {Appointment} from '../models';
import {AppointmentRepository} from '../repositories';


export class AppointmentController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository: AppointmentRepository,
  ) { }

  @post('/appointments')
  @response(200, {
    description: 'Appointment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Appointment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {
            title: 'NewAppointment',
            exclude: ['Id'],
          }),
        },
      },
    })
    appointment: Omit<Appointment, 'Id'>,
  ): Promise<object> {
    const err = valIdatorBody(appointment)
    return this.appointmentRepository.create(appointment);
  }

  @get('/appointments/count')
  @response(200, {
    description: 'Appointment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Appointment) where?: Where<Appointment>,
  ): Promise<Count> {
    return this.appointmentRepository.count(where);
  }

  @get('/appointments')
  @response(200, {
    description: 'Array of Appointment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Appointment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Appointment) filter?: Filter<Appointment>,
  ): Promise<Appointment[]> {
    return this.appointmentRepository.find(filter);
  }

  @patch('/appointments')
  @response(200, {
    description: 'Appointment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {partial: true}),
        },
      },
    })
    appointment: Appointment,
    @param.where(Appointment) where?: Where<Appointment>,
  ): Promise<Count> {
    return this.appointmentRepository.updateAll(appointment, where);
  }

  @get('/appointments/{Id}')
  @response(200, {
    description: 'Appointment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Appointment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('Id') Id: string,
    @param.filter(Appointment, {exclude: 'where'}) filter?: FilterExcludingWhere<Appointment>
  ): Promise<Appointment> {
    return this.appointmentRepository.findById(Id, filter);
  }

  @patch('/appointments/{Id}')
  @response(204, {
    description: 'Appointment PATCH success',
  })
  async updateById(
    @param.path.string('Id') Id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {partial: true}),
        },
      },
    })
    appointment: Appointment,
  ): Promise<void> {
    await this.appointmentRepository.updateById(Id, appointment);
  }

  @put('/appointments/{Id}')
  @response(204, {
    description: 'Appointment PUT success',
  })
  async replaceById(
    @param.path.string('Id') Id: string,
    @requestBody() appointment: Appointment,
  ): Promise<void> {
    await this.appointmentRepository.replaceById(Id, appointment);
  }

  @del('/appointments/{Id}')
  @response(204, {
    description: 'Appointment DELETE success',
  })
  async deleteById(@param.path.string('Id') Id: string): Promise<void> {
    await this.appointmentRepository.deleteById(Id);
  }
}




const valIdatorBody = (body: any) => {
  let today: any
  today = new Date();
  let time;
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  today = dd + '/' + mm + '/' + yyyy;
  time = moment().format('HH:mm');
  console.log(body.AppointmentDate, body.AppointmentTime)
  console.log(moment(body.AppointmentDate, 'DD/MM/YYYY', true).isValid())
  if (moment(body.AppointmentDate, 'DD/MM/YYYY', true).isValid()) {
    if (moment(today).isSame(body.AppointmentDate)) {
      if (moment(body.AppointmentTime, 'HH:mm', true).isValid()) {
        //
        if (time > body.AppointmentTime) {
          //console.log("before time")
          throw new HttpErrors[422]('Enter Time is of Past.Please enter valid & in 24 hour format ')
        }
      } else {
        throw new HttpErrors[422]('Please enter valid & in 24 hour format ')
      }


    } else if (moment(today).isBefore(body.AppointmentDate)) {
      if (!moment(body.AppointmentTime, 'HH:mm', true).isValid()) {
        throw new HttpErrors[422]('Please enter valid & in 24 hour format ')
        // console.log('here');
      }
    } else {
      throw new HttpErrors[422]('You enter past Date.Please enter Date in valid form dd/mm/yyyy ')
      //console.log("date before")
    }
  }
  else {
    throw new HttpErrors[422]('Please enter Date in valid form dd/mm/yyyy ')
    // console.log("date")
  }

  if (moment(body.BookedDate, 'DD/MM/YYYY', true).isValid() && moment(today).isSameOrBefore(body.BookedDate)) {


  }
  else {
    // new
    throw new HttpErrors[422]('Please enter Date in valid form dd/mm/yyyy  ')
  }

  if (body.Pincode <= 0 && body.PatientBp <= 0 && body.PatienceHeight <= 0 && body.PatienceSpo2 <= 0 && body.PatienceTemp <= 0 && body.PatienceWeight <= 0)
    throw new HttpErrors[422]('Please Enter Integer value greater than Zero . ')

}
