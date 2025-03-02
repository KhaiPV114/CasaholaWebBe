import { Types } from "mongoose";

 export class AccountDto {
      email: string;
    
      password: string;
    
      userId: Types.ObjectId;
    
      googleId?: string;
    
    //   status?: Status;

      refreshToken?: string;
    
    //   activation?: Activation;
    
    //   resetPWToken?: ResetPWToken;
    
      isAuthGoogle: boolean;
 }