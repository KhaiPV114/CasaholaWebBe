import { Types } from "mongoose";

export class CreateChatDto {
    receiveUid: string;

    message?: string;

    file?: string;
    
}
