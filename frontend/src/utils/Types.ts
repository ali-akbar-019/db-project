export interface User {
    id: number;
    name?: string;
    email: string;
    auth0Id: string;
    addressLine1?: string;
    city?: string;
    country?: string;
    phone?: string;
    createdAt: Date;
    isProfileSetup: boolean;
    Cart?: CartItem[];  
    Order?: Order[];    
    Fav?: Fav[];        
}

interface CartItem {
    // define CartItem fields here
}

export interface Order {
    id: number;
    userId: number;
    user: User;  // This assumes you have the User interface already defined.
    deliveryDetails: Record<string, any>;  // Represents JSON data, can be adjusted to match specific shape of your JSON
    cartItems: CartItem[];  // Assuming CartItem interface is defined elsewhere
    totalAmount: number;
    status: string;  // OrderStatus type would need to be defined
    createdAt: Date;
    updatedAt: Date;
}



interface Fav {
    // define Fav fields here
}
export interface Product {
    id: number;
    name: string;
    brand: string;
    category?: string;  // Optional because the Prisma model has "category String?" (nullable)
    gender: any;  // Assuming Gender is an enum (e.g., Male, Female, etc.)
    description?: string;  // Optional because it's nullable in Prisma
    price: number;
    discountPrice?: number;  // Optional because it's nullable in Prisma
    stock: number;
    isAvailable: boolean;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    images: any[];  // Assuming Image is another interface defined elsewhere
    Cart: CartItem[];  // Assuming CartItem is another interface defined elsewhere
    Fav: Fav[];  // Assuming Fav is another interface defined elsewhere
}
// 
export type CheckoutSessionData = {
    userId: string;
    photo?:string;
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    cartItems: {
        userId?: string;
        productId: any;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status?: "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";
    createdAt?: Date;
    updatedAt?: Date;
    phone?: string
};
