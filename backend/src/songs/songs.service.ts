import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from './bands.entity';
import { Repository } from 'typeorm';
import { Song } from './songs.entity';
import { AddSongDto } from './dto/add-song.dto';

@Injectable({})
export class SongsService {
  constructor(
    @InjectRepository(Band)
    private bandRepository: Repository<Band>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async addBand(addSongDto: AddSongDto) {
    const { bandName } = addSongDto;

    const existingBand = await this.bandRepository.findOneBy({ bandName });
    if (existingBand) {
      return existingBand.id;
    }

    const newBand = this.bandRepository.create({ bandName });
    const { id } = await this.bandRepository.save(newBand);
    return id;
  }

  async addSong(addSongDto: AddSongDto, bandId: number) {
    // TypeORM Direct Assignment Not Recommended need to fetch from DB first
    const band = await this.bandRepository.findOneBy({ id: bandId });
    if (!band) {
      throw new NotFoundException('Band not found');
    }

    const { songName, year } = addSongDto;

    const newSong = this.songRepository.create({
      name: songName,
      year: year,
      band: band,
    });

    return await this.songRepository.save(newSong);
  }

  async getSongs(searchQuery?: string): Promise<Song[]> {
    const queryBuilder = this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.band', 'band')
      .orderBy('band.bandName', 'ASC');

    if (searchQuery) {
      queryBuilder.where(
        'song.name LIKE :searchQuery OR band.bandName LIKE :searchQuery',
        { searchQuery: `%${searchQuery}%` },
      );
    }

    return await queryBuilder.getMany();
  }

  async deleteSong(id: string) {
    const result = await this.songRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Song not found');
    }
  }
}
