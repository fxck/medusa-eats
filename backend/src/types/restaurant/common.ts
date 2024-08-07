import { IModuleService, ProductDTO } from "@medusajs/types";
import {
  CreateRestaurantDTO,
  CreateRestaurantAdminDTO,
  UpdateRestaurantsDTO,
  UpdateRestaurantAdminsDTO,
} from "./mutations";

export interface IRestaurantModuleService extends IModuleService {
  createRestaurantProducts(
    data: RestaurantProductDTO | RestaurantProductDTO[]
  ): Promise<RestaurantProductDTO>;
  list(filter?: any, options?: any): Promise<RestaurantDTO[]>;
  listRestaurantAdmins(
    filter?: any,
    options?: any
  ): Promise<RestaurantAdminDTO[]>;
  listRestaurantProduct(
    filter?: any,
    options?: any
  ): Promise<RestaurantProductDTO[]>;
  create(
    data: CreateRestaurantDTO | CreateRestaurantDTO[]
  ): Promise<RestaurantDTO>;
  createRestaurantAdmins(
    data: CreateRestaurantAdminDTO
  ): Promise<RestaurantAdminDTO>;
  retrieveRestaurant(restaurantId: string): Promise<RestaurantDTO>;
  retrieveRestaurantAdmin(adminId: string): Promise<RestaurantAdminDTO>;
  update(data: UpdateRestaurantsDTO): Promise<RestaurantDTO>;
  updateRestaurantAdmins(
    data: UpdateRestaurantAdminsDTO
  ): Promise<RestaurantAdminDTO>;
  deleteRestaurants(restaurantId: string[]): Promise<void>;
  deleteRestaurantAdmin(adminId: string): Promise<void>;
  deleteRestaurantProducts(
    data: RestaurantProductDTO | RestaurantProductDTO[]
  ): Promise<void>;
}

export interface RestaurantDTO {
  id: string;
  handle: string;
  is_open: boolean;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  products?: ProductDTO[];
}

export interface RestaurantAdminDTO {
  id: string;
  restaurant: RestaurantDTO;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface RestaurantProductDTO {
  restaurant_id: string;
  product_id: string;
}

declare module "@medusajs/types" {
  export interface ModuleImplementations {
    restaurantModuleService: IRestaurantModuleService;
  }
}
