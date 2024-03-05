import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Band } from './bands.entity';
import { Song } from './songs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Band, Song])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
