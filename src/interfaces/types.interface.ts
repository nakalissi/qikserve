export interface MenuItemImageProps {
    id: number,
    image: string
}

export interface MenuProps {
    id: number,
    name: string,
    description?: string,
    position: number,
    visible: number,
    images: MenuItemImageProps[],
    items: ItemProps[],
}

export interface ItemProps {
  id: number,
  name: string,
  description: string,
  alcoholic: number,
  price: number,
  position: number,
  visible: number,
  availabilityType: string,
  sku: string,
  images?: MenuItemImageProps[],
  available: boolean
  modifiers?: ModifiersProps[],
}

export interface ModifiersProps {
  name: string,
  minChoices: number,
  maxChoices: number,
  items: { id: string; name: string, price: number }[],
}

export interface CartProps {
  id: number,
  name: string,
  quantity: number,
  price: number,
  description?: string,
} 