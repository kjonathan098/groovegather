import { Band } from './bands.entity';
import { Repository } from 'typeorm';
export declare class SongsService {
    private bandRepository;
    constructor(bandRepository: Repository<Band>);
    addBand(bandName: string): Promise<void>;
}
