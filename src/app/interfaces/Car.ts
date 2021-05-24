export interface Car {
  name?: string;
  releaseDate?: number;
  engineCapacity?: number;
  enginePower?: number;
  surname?: string;
  price?: number;
  options?: Array<{
    value: string;
    name: string;
  }>;
  image?: string;
  comment?: string;
  id?: string;
  uid?: string;
  seats?: number;
  color?: string;
  transmission?: string;
  sale?: number;
}
