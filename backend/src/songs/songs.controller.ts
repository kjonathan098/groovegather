import { Body, Controller, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async addSong(
    @Body('bandName') bandName: string,
    @Body('songName') songName: string,
    @Body('year') year: number,
  ) {
    const bandId = await this.songsService.addBand(bandName);
    const res = await this.songsService.addSong({ songName, year, bandId });
    return res;
  }
}
