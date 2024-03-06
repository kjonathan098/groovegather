import { IsNotEmpty, IsString, Min, Max, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddSongDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  bandName: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  songName: string;

  @IsNotEmpty()
  @IsNumber()
  // @Max(new Date().getFullYear())
  year: number;
}
