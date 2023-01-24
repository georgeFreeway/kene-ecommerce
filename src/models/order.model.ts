import { Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { User } from "./user.model";
import { Product } from "./products.model";

class OrderItems {
    @prop({ required: true })
    name: string

    @prop({ required: true })
    qty: string

    @prop({ required: true })
    image: string

    @prop({ required: true })
    price: number

    @prop({ ref: () => Product, required: true })
    product: Ref<Product>
}

class Address {
    @prop({ required: true })
    address: string

    @prop({ required: true })
    city: string

    @prop({ required: true })
    postalCode: string

    @prop({ required: true })
    country: string
}

class PaymentResult {
    @prop()
    id: string

    @prop()
    status: string

    @prop()
    update_time: string

    @prop()
    email_address: string
}

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Order {
    @prop({ ref: () => User })
    user: Ref<User>

    @prop()
    orderItems: OrderItems[]

    @prop({ ref: () => Address })
    shippingAddress: Ref<Address>

    @prop({ required: true })
    paymentMethod: string

    @prop({ ref: () => PaymentResult })
    paymentResult: Ref<PaymentResult>

    @prop({ required: true, default: 0 })
    taxPrice: number

    @prop({ required: true, default: 0 })
    shippingPrice: number

    @prop({ required: true, default: 0 })
    totalPrice: number

    @prop({ required: true, default: false })
    isPaid: boolean

    @prop({ required: true, default: false })
    isDelivered: boolean

    @prop()
    paidAt: Date

    @prop()
    deliveredAt: Date
}

const OrderModel = getModelForClass(Order);
export default OrderModel;