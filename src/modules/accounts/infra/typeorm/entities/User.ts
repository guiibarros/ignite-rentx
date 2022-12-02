import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public driver_license: string;

  @Column()
  public is_admin: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @Column({ nullable: true })
  public avatar: string;

  @Expose({ name: 'avatar_url' })
  public avatar_url(): string {
    switch (process.env.DISK) {
      case 'local': {
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      }

      case 's3': {
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      }

      default: {
        return null;
      }
    }
  }

  public constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
