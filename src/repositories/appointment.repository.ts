import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AppointmentDataSource} from '../datasources';
import {Appointment, AppointmentRelations} from '../models';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.Id,
  AppointmentRelations
> {
  constructor(
    @inject('datasources.appointment') dataSource: AppointmentDataSource,
  ) {
    super(Appointment, dataSource);
  }
}
