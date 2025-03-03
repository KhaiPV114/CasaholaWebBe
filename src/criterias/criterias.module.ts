import { Module } from '@nestjs/common';
import { CriteriasService } from './criterias.service';
import { CriteriasController } from './criterias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Criteria, CriteriaSchema } from 'src/schemas/Criteria.schema';
import { User, UserSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Criteria.name,
        schema: CriteriaSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CriteriasController],
  providers: [CriteriasService],
})
export class CriteriasModule {}
