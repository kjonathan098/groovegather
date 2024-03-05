import { IsNotEmpty } from 'class-validator';
export class AddSongDto {
  @IsNotEmpty()
  bandName: string;

  @IsNotEmpty()
  songName: string;

  @IsNotEmpty()
  year: number;
}
