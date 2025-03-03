import mongoose from "mongoose" 
import Place, { IPlace } from "./places.model"
import { CreatePlaceDto } from "./dtos/create.place.dto";
import { UpdatePlaceDto } from "./dtos/update.place.dto";

export class PlacesService {
    constructor(private readonly places: mongoose.Model<IPlace>) {}

    getOfUser = async (ownerID: string) => {
        return await this.places.find({
            ownerID
        });
    }

    getByID = async (id: string) => {
        return await this.places.findById(id);
    }

    getByTitleOfUser = async(ownerID: string, title: string) => {
        return await this.places.findOne({
            ownerID,
            title
        });
    }

    get = async() => {
        return await this.places.find();
    }

    create = async(ownerID: string, createPlaceDto: CreatePlaceDto) => {
        const place = new Place({
            ownerID,
            ...createPlaceDto
        });
        return await place.save();
    }

    update = async(id: string, updatePlaceDto: UpdatePlaceDto) => {
        return await this.places.findByIdAndUpdate(id, updatePlaceDto, { new: true });
    }

    remove = async(id: string) => {
        return await this.places.findByIdAndDelete(id);
    }
}

const placesService = new PlacesService(Place);
export default placesService;