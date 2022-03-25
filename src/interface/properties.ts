export interface IPropertyMySql {
  id?: number;
  productTypeId: number;
  categoryId: number;
  propertyName: string;
}

export interface IPropertySubItems {
  id?: number;
  productPropertyId: number;
  subPropertyName: string;
}

export interface IPropertyValue {
  id?: number;
  value: string;
  productPropertieSubItemId: number;
}

export interface IProductPresentationProperty {
  id?: number;
  productId: number;
  productPropertieValueId: number;
}
