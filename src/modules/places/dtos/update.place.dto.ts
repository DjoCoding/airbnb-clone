import { CreatePlaceDto } from "./create.place.dto";

export type UpdatePlaceDto = Partial<CreatePlaceDto> & {
    isAvailable?: boolean;
};