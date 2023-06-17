import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

const ormConfig = require('../ormconfig.json');

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, connection }) => {
        if (connection) {
          console.log('>>>>>>>>>>>', connection, '>>>>>>>>>>');
          return { headers: connection.context };
        }
        return { headers: req.headers };
      },
      debug: true,
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot(ormConfig[0]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
