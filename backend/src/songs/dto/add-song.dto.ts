import { IsNotEmpty, IsString } from 'class-validator';
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
  year: number;
}
