import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsUUID, IsEmail, IsJSON, IsString, IsBoolean, IsUrl, IsArray, IsNumber, IsOptional } from 'class-validator';


@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  chain: string;

  @Column({ name: 'chain_class_name' })
  @IsNotEmpty()
  @IsString()
  chainClassName: string;

  @Column({ name: 'chain_id' })
  @IsNotEmpty()
  @IsUUID()
  chainId: string;

  @Column({ name: 'is_ecommerce', default: false })
  @IsBoolean()
  @IsOptional()
  isEcommerce: boolean;

  @Column({ name: 'news_paper_url', nullable: true })
  @IsUrl()
  @IsOptional()
  newsPaperUrl: string;

  @Column({ name: 'chain_image', nullable: true })
  @IsUrl()
  @IsOptional()
  chain_image?: string;

  @Column({ type: 'jsonb', name: 'in_store_service', default: [] })
  @IsArray()
  @IsOptional()
  inStoreService: string[];

  @Column({ type: 'double precision' })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @Column({ type: 'double precision' })
  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ name: 'organization_number' })
  @IsNotEmpty()
  @IsString()
  organizationNumber: string;

  @Column({ name: 'opening_hours', type: 'jsonb', default: [] })
  @IsOptional()
  @IsArray()
  @IsJSON()
  openingHours?: {
    date: string
    day: string
    openString: string
    closed: string
    specialOpeningHours: boolean
  }[];

  @Column({ name: 'additional_information', nullable: true, type: 'text' })
  @IsString()
  @IsOptional()
  additionalInformation: string;
}