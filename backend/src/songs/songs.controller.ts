import { Body, Controller, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  addSong(
    @Body('bandName') bandName: string,
    @Body('songName') songName: string,
    @Body('year') year: number,
  ) {
    return this.songsService.addBand(bandName);
  }
}
