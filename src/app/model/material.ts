import { MeasurementUnit } from "./measurementUnit";

export class Material{
  idMaterial: number;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  cost: number;
  images: string[] = [
    "assets/images/user/no-image.png",
  ];
  status: number;
}
