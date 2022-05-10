import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Appointment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  UserId: string;

  @property({
    type: 'string',
    required: true,
  })
  DoctorId: string;

  @property({
    type: 'string',
    required: true,
  })
  ClinicId: string;

  @property({
    type: 'string',
    required: true,
  })
  Title: string;

  @property({
    type: 'string',
    required: true,
  })
  AppointmentDate: string;

  @property({
    type: 'string',
    required: true,
  })
  AppointmentTime: string;

  @property({
    type: 'string',
    required: true,
  })
  AppointmentChannel: string;

  @property({
    type: 'string',
    required: true,
  })
  AppointmentType: string;

  @property({
    type: 'string',
    required: true,
  })
  FirstName: string;

  @property({
    type: 'string',
    required: true,
  })
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  BookedDate: string;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'number',
    required: true,
  })
  Pincode: number;

  @property({
    type: 'number',
    required: true,
  })
  PatientBp: number;

  @property({
    type: 'string',
    required: true,
  })
  PatiencePlus: string;

  @property({
    type: 'number',
    required: true,
  })
  PatienceSpo2: number;

  @property({
    type: 'number',
    required: true,
  })
  PatienceTemp: number;

  @property({
    type: 'number',
    required: true,
  })
  PatienceWeight: number;

  @property({
    type: 'number',
    required: true,
  })
  PatienceHeight: number;

  @property({
    type: 'string',
    required: true,
  })
  ShortNote: string;

  @property({
    type: 'string',
    required: true,
  })
  PresciptionNote: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
