export interface ICity {
  id: number;
  title: string;
  slug: string;
  province_id: number;
  latitude: number;
  longitude: number;
  name: string;
}


export interface ILocation{
    id:number,
    city:string,
    address:string
}


