import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { AddSongDto } from './dto/add-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Papa from 'papaparse';
import * as fs from 'fs';
import { error } from 'console';

interface CsvSong {
  Band: string;
  'Song Name': string;
  Year: string;
}

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // add an individual song
  @Post()
  @UsePipes(ValidationPipe)
  async addSong(@Body() addSongDto: AddSongDto) {
    const bandId = await this.songsService.addBand(addSongDto);
    return await this.songsService.addSong(addSongDto, bandId);
  }

  // upload csv to db
  @Post('file')
  @UseInterceptors(FileInterceptor('songsCsv', { dest: './uploads' }))
  async addBulkSongs(@UploadedFile() file: Express.Multer.File) {
    const fileContent = fs.readFileSync(file.path, 'utf8');

    return new Promise((resolve, reject) => {
      Papa.parse<CsvSong>(fileContent, {
        header: true,

        transform: (value) => value.toLowerCase(),

        complete: async (result) => {
          const validSongs = result.data.filter(
            (item: CsvSong) => item['Song Name'] && item.Band && item.Year,
          );

          const operations = validSongs.map(async (song) => {
            const addSongDto = new AddSongDto();
            addSongDto.bandName = song.Band;
            addSongDto.songName = song['Song Name'];
            addSongDto.year = parseInt(song.Year);

            const bandId = await this.songsService.addBand(addSongDto);
            await this.songsService.addSong(addSongDto, bandId);
          });

          try {
            await Promise.all(operations);
            resolve('All songs have been successfully added to the database.');
          } catch (error) {
            reject(error);
          }
        },
        error: error,
      });
    }).finally(() => {
      fs.unlinkSync(file.path);
    });
  }

  // fetch all songs
  @Get()
  async fetchSongs(@Query('search') query?: string) {
    return await this.songsService.getSongs(query);
  }

  // delete song
  @Delete(':id')
  async deleteSong(@Param('id') id: string) {
    await this.songsService.deleteSong(id);
  }
}
