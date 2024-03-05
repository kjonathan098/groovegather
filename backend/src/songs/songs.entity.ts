import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Band } from './bands.entity'; // Ensure the path is correct

@Entity('Songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('year')
  year: number;

  @ManyToOne(() => Band, (band) => band.songs)
  @JoinColumn({ name: 'BandID' }) // This matches the BandID column in the Songs table
  band: Band;
}
