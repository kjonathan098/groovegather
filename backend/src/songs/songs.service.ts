import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from './bands.entity';
import { Repository } from 'typeorm';

@Injectable({})
export class SongsService {
  constructor(
    @InjectRepository(Band)
    private bandRepository: Repository<Band>,
  ) {}

  async addBand(bandName: string) {
    const newBand = this.bandRepository.create({ bandName });
    const res = await this.bandRepository.save(newBand);
    console.log(res);
  }
}
