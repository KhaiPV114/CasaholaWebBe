import { IsNotEmpty, IsString } from 'class-validator';

export class CriteriaDto {
  @IsString()
  @IsNotEmpty()
  purpose: string;

  @IsString()
  @IsNotEmpty()
  budget: string;

  @IsString()
  @IsNotEmpty()
  moneyOpinion: string;

  @IsString()
  @IsNotEmpty()
  habit: string;

  @IsString()
  @IsNotEmpty()
  timeActivate: string;

  @IsString()
  @IsNotEmpty()
  hobby: string;

  @IsString()
  @IsNotEmpty()
  hygiene: string;

  @IsString()
  @IsNotEmpty()
  outsider: string;

  @IsString()
  @IsNotEmpty()
  pet: string;

  @IsString()
  @IsNotEmpty()
  cooking: string;

  @IsString()
  @IsNotEmpty()
  vehicle: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  sharingWay: string;
}

export class RoomMatchDto {
  @IsString()
  purpose?: string;

  @IsString()
  budget?: string;

  @IsString()
  moneyOpinion?: string;

  @IsString()
  habit?: string;

  @IsString()
  timeActivate?: string;

  @IsString()
  hobby?: string;

  @IsString()
  hygiene?: string;

  @IsString()
  outsider?: string;

  @IsString()
  pet?: string;

  @IsString()
  cooking?: string;

  @IsString()
  vehicle?: string;

  @IsString()
  region?: string;

  @IsString()
  sharingWay?: string;
}
