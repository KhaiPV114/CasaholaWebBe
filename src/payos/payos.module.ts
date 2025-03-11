import { Module } from "@nestjs/common";
import { PayOSController } from "./payos.controller";
import { PayOSService } from "./payos.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Package, PackageSchema } from "src/schemas/Package.schema";
import { User, UserSchema } from "src/schemas/User.schema";

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
    controllers: [PayOSController],
    providers: [PayOSService]
})
export class PayOSModule{}