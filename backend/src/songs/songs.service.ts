import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from './bands.entity';
import { Repository } from 'typeorm';
import { Song } from './songs.entity';

@Injectable({})
export class SongsService {
  constructor(
    @InjectRepository(Band)
    private bandRepository: Repository<Band>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async addBand(bandName: string) {
    const newBand = this.bandRepository.create({ bandName });
    const { id } = await this.bandRepository.save(newBand);
    return id;
  }

  async addSong(songData: { songName: string; year: number; bandId: number }) {
    // TypeORM Direct Assignment Not Recommended need to fetch from DB first
    const band = await this.bandRepository.findOneBy({ id: songData.bandId });
    if (!band) {
      throw new Error('Band not found');
    }

    const newSong = this.songRepository.create({
      name: songData.songName,
      year: songData.year,
      band: band,
    });

    const res = await this.songRepository.save(newSong);

    return res;
  }
}
