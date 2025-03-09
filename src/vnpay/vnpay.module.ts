import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from 'src/schemas/Package.schema';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [VnpayController],
  providers: [VnpayService],
})
export class VnpayModule {}
