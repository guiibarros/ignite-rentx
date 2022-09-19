import { PrimaryColumn, Column, CreateDateColumn, Entity } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('categories')
class Category {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @CreateDateColumn()
  public created_at: Date;

  public constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
