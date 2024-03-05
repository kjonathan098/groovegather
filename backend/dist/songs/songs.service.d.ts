import { Band } from './bands.entity';
import { Repository } from 'typeorm';
import { Song } from './songs.entity';
export declare class SongsService {
    private bandRepository;
    private songRepository;
    constructor(bandRepository: Repository<Band>, songRepository: Repository<Song>);
    addBand(bandName: string): Promise<number>;
    addSong(songData: {
        songName: string;
        year: number;
        bandId: number;
    }): Promise<Song>;
}
