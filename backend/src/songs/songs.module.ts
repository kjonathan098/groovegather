import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({})
export class SongsModule {
  controllers: [SongsController];
  providers: [SongsService];
}
