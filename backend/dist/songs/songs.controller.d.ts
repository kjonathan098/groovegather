import { SongsService } from './songs.service';
import { AddSongDto } from './dto/add-song.dto';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    addSong(addSongDto: AddSongDto): Promise<import("./songs.entity").Song>;
    addBulkSongs(songsArray: any): Promise<string>;
    fetchAllSongs(): Promise<import("./songs.entity").Song[]>;
}
