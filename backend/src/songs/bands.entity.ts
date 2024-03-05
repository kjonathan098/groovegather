import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Song } from './songs.entity'; // Assuming Song entity is in the same directory

@Entity('Bands')
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  bandName: string;

  @OneToMany(() => Song, (song) => song.band)
  songs: Song[];
}
