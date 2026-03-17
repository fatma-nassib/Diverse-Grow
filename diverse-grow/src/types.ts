// ─── Core Domain Types ────────────────────────────────────────────────────────

export type UserRole = 'farmer' | 'cooperative_admin' | 'buyer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  location: string;
  cooperative?: string;
  avatar: string;
  joinedAt: string;
}

// Farm Management
export type CropStatus = 'planted' | 'germinating' | 'growing' | 'flowering' | 'harvesting' | 'harvested';

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plotId: string;
  plantedDate: string;
  expectedHarvestDate: string;
  status: CropStatus;
  progressPercent: number;
  areaHa: number;
  inputCost: number;
  notes: string;
}

export interface Plot {
  id: string;
  name: string;
  areaHa: number;
  soilType: string;
  location: string;
}

export interface YieldRecord {
  month: string;
  year: number;
  cropName: string;
  yieldTonnes: number;
  incomeUSD: number;
}

export interface ActivityLog {
  id: string;
  cropId: string;
  cropName: string;
  date: string;
  type: 'planting' | 'watering' | 'fertilising' | 'spraying' | 'harvesting' | 'observation';
  description: string;
  cost?: number;
}

// Marketplace
export type ProduceCategory = 'grains' | 'vegetables' | 'fruits' | 'livestock' | 'dairy' | 'inputs';
export type ListingStatus = 'active' | 'pending' | 'sold' | 'expired';

export interface Listing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerCooperative: string;
  sellerLocation: string;
  title: string;
  category: ProduceCategory;
  description: string;
  pricePerUnit: number;
  unit: string;
  quantityAvailable: number;
  deliveryOptions: string[];
  imageColor: string;
  status: ListingStatus;
  postedAt: string;
  expiresAt: string;
}

export interface NewListingForm {
  title: string;
  category: ProduceCategory | '';
  description: string;
  pricePerUnit: string;
  unit: string;
  quantityAvailable: string;
  deliveryOptions: string[];
}

// Education
export type ArticleCategory = 'soil' | 'pests' | 'harvest' | 'market' | 'cooperative' | 'irrigation';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  body: string;
  readTimeMin: number;
  reads: number;
  author: string;
  publishedAt: string;
  tags: string[];
}

// Cooperative
export type MemberStatus = 'active' | 'inactive' | 'pending';
export type MemberRole = 'chairperson' | 'secretary' | 'treasurer' | 'member';

export interface CoopMember {
  id: string;
  name: string;
  role: MemberRole;
  status: MemberStatus;
  location: string;
  joinedAt: string;
  farmsHa: number;
  phone: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CoopDocument {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
  sizeMb: number;
}

export interface Cooperative {
  id: string;
  name: string;
  location: string;
  founded: string;
  plan: 'free' | 'pro' | 'enterprise';
  memberCount: number;
  totalFarmsHa: number;
  monthlyRevenueUSD: number;
  description: string;
}

// Navigation
export type Screen =
  | 'dashboard'
  | 'farm-management'
  | 'marketplace'
  | 'marketplace-post'
  | 'education'
  | 'education-article'
  | 'cooperative';
