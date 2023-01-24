import { getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class ReviewSchema {
    @prop({ required: true })
    name: string

    @prop({ required: true })
    rating: number

    @prop({ required: true })
    comment: string
}

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Product {
    @prop({ ref: () => User})
    user: Ref<User>

    @prop({ required: true })
    name: string

    @prop({ required: true })
    image: string

    @prop({ required: true })
    brand: string

    @prop({ required: true })
    category: string

    @prop({ required: true })
    description: string

    @prop({ required: true, default: 0 })
    rating: number

    @prop({ required: true, default: 0})
    numReviews: number

    @prop({ required: true, default: 0})
    price: number

    @prop({ required: true, default: 0})
    countInStock: number

    @prop({ ref: () => ReviewSchema })
    reviews: Ref<ReviewSchema>[]
}

const ProductModel = getModelForClass(Product);
export default ProductModel;