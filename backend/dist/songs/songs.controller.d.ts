import { SongsService } from './songs.service';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    addSong(bandName: string, songName: string, year: number): Promise<void>;
}
