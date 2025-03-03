"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformPlace;
exports.transformPlaces = transformPlaces;
function transformPlace(place) {
    return {
        id: place._id,
        ownerID: place.ownerID,
        title: place.title,
        description: place.description || "",
        pictures: place.pictures,
        price: place.price,
        createdAt: place.createdAt
    };
}
function transformPlaces(places) {
    return places.map(place => transformPlace(place));
}
