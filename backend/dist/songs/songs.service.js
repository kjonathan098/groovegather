"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bands_entity_1 = require("./bands.entity");
const typeorm_2 = require("typeorm");
const songs_entity_1 = require("./songs.entity");
let SongsService = class SongsService {
    constructor(bandRepository, songRepository) {
        this.bandRepository = bandRepository;
        this.songRepository = songRepository;
    }
    async addBand(addSongDto) {
        const { bandName } = addSongDto;
        const existingBand = await this.bandRepository.findOneBy({ bandName });
        if (existingBand) {
            return existingBand.id;
        }
        const newBand = this.bandRepository.create({ bandName });
        const { id } = await this.bandRepository.save(newBand);
        return id;
    }
    async addSong(addSongDto, bandId) {
        try {
            const band = await this.bandRepository.findOneBy({ id: bandId });
            if (!band) {
                throw new common_1.NotFoundException('Band not found');
            }
            const { songName, year } = addSongDto;
            const newSong = this.songRepository.create({
                name: songName,
                year: year,
                band: band,
            });
            const res = await this.songRepository.save(newSong);
            return res;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add the song due to an unexpected error. Please try again later.');
        }
    }
    async getSongs(searchQuery) {
        try {
            const queryBuilder = this.songRepository
                .createQueryBuilder('song')
                .leftJoinAndSelect('song.band', 'band')
                .orderBy('band.bandName', 'ASC');
            if (searchQuery) {
                queryBuilder.where('song.name LIKE :searchQuery OR band.bandName LIKE :searchQuery', { searchQuery: `%${searchQuery}%` });
            }
            return await queryBuilder.getMany();
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.InternalServerErrorException('Failed to fetch songs');
        }
    }
    async deleteSong(id) {
        try {
            await this.songRepository.delete(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete song');
        }
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, typeorm_1.InjectRepository)(bands_entity_1.Band)),
    __param(1, (0, typeorm_1.InjectRepository)(songs_entity_1.Song)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map