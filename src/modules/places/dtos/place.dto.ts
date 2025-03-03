import { IPlace } from "../places.model";

export interface PlaceDto {
    id: string;
    ownerID: string;
    title: string;
    description: string;
    pictures: string[];
    price: number;
    createdAt: Date;
}

export default function transformPlace(place: IPlace) {
    return ({
        id: place._id,
        ownerID: place.ownerID,
        title: place.title,
        description: place.description || "",
        pictures: place.pictures,
        price: place.price,
        createdAt: place.createdAt
    } as PlaceDto);
}

export function transformPlaces(places: IPlace[]) {
    return places.map(place => transformPlace(place));
}