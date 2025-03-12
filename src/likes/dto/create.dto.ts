import { IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  targetUid: string;

  @IsNotEmpty()
  sourceUid: string;
}
