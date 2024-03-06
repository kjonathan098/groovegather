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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("./songs.service");
const add_song_dto_1 = require("./dto/add-song.dto");
const platform_express_1 = require("@nestjs/platform-express");
const Papa = require("papaparse");
const fs = require("fs");
let SongsController = class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    async addSong(addSongDto) {
        try {
            const bandId = await this.songsService.addBand(addSongDto);
            const res = await this.songsService.addSong(addSongDto, bandId);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async addBulkSongs(file) {
        const fileContent = fs.readFileSync(file.path, 'utf8');
        return new Promise((resolve, reject) => {
            Papa.parse(fileContent, {
                header: true,
                transform: (value) => value.toLowerCase(),
                complete: async (result) => {
                    const validSongs = result.data.filter((item) => item['Song Name'] && item.Band && item.Year);
                    const operations = validSongs.map(async (song) => {
                        const addSongDto = new add_song_dto_1.AddSongDto();
                        addSongDto.bandName = song.Band;
                        addSongDto.songName = song['Song Name'];
                        addSongDto.year = parseInt(song.Year);
                        const bandId = await this.songsService.addBand(addSongDto);
                        await this.songsService.addSong(addSongDto, bandId);
                    });
                    await Promise.all(operations);
                    resolve('All songs have been successfully added to the database.');
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    }
    async fetchSongs(query) {
        try {
            return await this.songsService.getSongs(query);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteSong(id) {
        try {
            await this.songsService.deleteSong(id);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.SongsController = SongsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_song_dto_1.AddSongDto]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "addSong", null);
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('songsCsv', { dest: './uploads' })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "addBulkSongs", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "fetchSongs", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "deleteSong", null);
exports.SongsController = SongsController = __decorate([
    (0, common_1.Controller)('songs'),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
//# sourceMappingURL=songs.controller.js.map