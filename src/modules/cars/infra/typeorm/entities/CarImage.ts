import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from './Car';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  public id: string;

  @Column()
  public image_name: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  public car_id: string;

  @CreateDateColumn()
  public created_at: Date;

  public constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };
