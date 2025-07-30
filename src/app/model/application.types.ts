export interface User {
  id: number;
  name: string | null;
  email: string;
  number: string | null;
  profilePicture: string | null;
  password: string;
  createdAt: string;
  profilecompleted: boolean;
}
export interface Address {
  id: number;
  userId: number;
  addressLine: string;
  locality: string | null;
  city: string | null;
  pincode: string | null;
  landmark: string | null;
  isDefault: boolean;
}
export interface StoreAdmin {
  id: number;
  storeName: string;
  adminName: string;
  email: string;
  number: string | null;
  profilePicture: string | null;
  password: string;
  createdAt: string;
}
export interface StoreAddress {
  id: number;
  storeAdminId: number;
  addressLine: string;
  locality: string | null;
  city: string | null;
  pincode: string | null;
}
export interface StoreItem {
  id: number;
  storeAdminId: number;
  itemName: string;
  itemDescription: string | null;
  itemPicture: string | null;
  rate: string; // because Supabase returns numeric as string
  quantity: number;
  discountPercent: string | null; // numeric type returns as string
  isAvailable: boolean;
  createdAt: string;
}
export interface Order {
  id: number;
  userId: number;
  addressId: number;
  paymentStatus: string;
  totalAmount: string; // numeric
  orderStatus: string | null;
  createdAt: string;
}
export interface OrderItem {
  id: number;
  orderId: number;
  storeItemId: number;
  quantity: number;
  priceAtOrder: string; // numeric
  discountApplied: string | null; // numeric
}
