import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'appointment',
  connector: 'mongodb',
  url: 'mongodb+srv://riteshrijhwani:riteshrijhwani@cluster0.mseyk.mongodb.net/appointment?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: 'riteshrijhwani',
  password: 'riteshrijhwani',
  database: 'appointment',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AppointmentDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'appointment';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.appointment', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
