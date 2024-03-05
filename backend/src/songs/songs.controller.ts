import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { AddSongDto } from './dto/add-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async addSong(@Body() addSongDto: AddSongDto) {
    // first add band to DB
    const bandId = await this.songsService.addBand(addSongDto);

    // Add song under band
    const res = await this.songsService.addSong(addSongDto, bandId);
    return res;
  }

  @Post('bulk')
  async addBulkSongs(@Body('data') songsArray: any) {
    return 'hello';
  }

  @Get()
  async fetchAllSongs() {
    return await this.songsService.getAllSongs();
  }
}
