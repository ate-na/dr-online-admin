import { useEffect, useState } from "react";
import { ICity } from "../types/location.model";

const useCities = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [cityLoading, setcitiLoading] = useState<boolean>(false);
  useEffect(() => {
    setcitiLoading(true);
    const getData = async () => {
      try {
        const data = await fetch("https://dronline-crm.liara.run/cities.json");
        const res = await data.json();
        setCities(() => res);
        setcitiLoading(false);
      } catch (error) {
        setcitiLoading(false);
      }
    };
    getData();
  }, []);

  return { cities, cityLoading };
};

export default useCities;
