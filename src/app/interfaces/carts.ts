export interface ProductList {
  productId: number;
  quantity: number;
}

export interface Cart {

  "id": string,
  "userId": number,
  "date": string,
  "products": ProductList[],
  "__v": 0
}
