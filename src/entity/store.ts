import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class StoreWithoutId {
  @Expose()
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @Column()
  @IsNotEmpty()
  @IsString()
  chain: string;

  @Expose()
  @Column({ name: 'chain_class_name' })
  @IsNotEmpty()
  @IsString()
  chainClassName: string;

  @Expose()
  @Column({ name: 'chain_id' })
  @IsNotEmpty()
  @IsUUID()
  chainId: string;

  @Expose()
  @Column({ name: 'is_ecommerce', default: false })
  @IsBoolean()
  @IsOptional()
  isEcommerce: boolean;

  @Expose()
  @Column({ name: 'news_paper_url', nullable: true })
  @IsUrl()
  @IsOptional()
  newsPaperUrl: string;

  @Expose()
  @Column({ name: 'chain_image', nullable: true })
  @IsUrl()
  @IsOptional()
  chain_image?: string;

  @Expose()
  @Column({ type: 'jsonb', name: 'in_store_service', default: [] })
  @IsArray()
  @IsOptional()
  inStoreService: string[];

  @Expose()
  @Column({ type: 'double precision' })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @Expose()
  @Column({ type: 'double precision' })
  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @Expose()
  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Expose()
  @Column()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Expose()
  @Column()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Expose()
  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @Column({ name: 'organization_number' })
  @IsNotEmpty()
  @IsString()
  organizationNumber: string;

  @Expose()
  @Column({ name: 'opening_hours', type: 'jsonb', default: [] })
  @IsOptional()
  @IsArray()
  openingHours?: {
    date: string;
    day: string;
    openString: string;
    closed: string;
    specialOpeningHours: boolean;
  }[];

  @Expose()
  @Column({ name: 'additional_information', nullable: true, type: 'text' })
  @IsString()
  @IsOptional()
  additionalInformation: string;
}

@Entity()
export class Store extends StoreWithoutId {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
