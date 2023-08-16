export class Product {
    constructor(public productId :string,
        public name :string,
        public description :string,
        public category_id :string,
        public price :number,
        public stockQuantity :number,
        public imageUrl:string,
        public createdAt :Date,
        public updatedAt :Date
        ){
        
    }
}
