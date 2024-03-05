import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { AddSongDto } from './dto/add-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('file')
  @UseInterceptors(FileInterceptor('songsCsv', { dest: './uploads' }))
  async addBulkSongs(@UploadedFile() file: Express.Multer.File) {
    return 'afaf';
  }

  @Get()
  async fetchAllSongs() {
    return await this.songsService.getAllSongs();
  }
}
