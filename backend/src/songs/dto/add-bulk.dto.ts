import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddSongDto } from './add-song.dto';

export class AddSongsArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddSongDto)
  songs: AddSongDto[];
}
