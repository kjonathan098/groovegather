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
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as Papa from 'papaparse';
import * as fs from 'fs';

interface CsvSong {
  Band: string;
  'Song Name': string;
  Year: string;
}

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async addSong(@Body() addSongDto: AddSongDto) {
    try {
      // first add band to DB
      const bandId = await this.songsService.addBand(addSongDto);

      // Add song under band
      const res = await this.songsService.addSong(addSongDto, bandId);
      return res;
    } catch (error) {
      throw error;
    }
  }

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

          await Promise.all(operations);
          resolve('All songs have been successfully added to the database.');
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  @Get()
  async fetchAllSongs() {
    try {
      return await this.songsService.getAllSongs();
    } catch (error) {
      throw error;
    }
  }
}
