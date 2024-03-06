import { Band } from './bands.entity';
import { Repository } from 'typeorm';
import { Song } from './songs.entity';
import { AddSongDto } from './dto/add-song.dto';
export declare class SongsService {
    private bandRepository;
    private songRepository;
    constructor(bandRepository: Repository<Band>, songRepository: Repository<Song>);
    addBand(addSongDto: AddSongDto): Promise<number>;
    addSong(addSongDto: AddSongDto, bandId: number): Promise<Song>;
    getSongs(searchQuery?: string): Promise<Song[]>;
    deleteSong(id: string): Promise<void>;
}
