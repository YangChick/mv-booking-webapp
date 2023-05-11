import { useEffect } from "react";

const choosenFood = (prop: { payload: any }) => {
  useEffect(() => {
    console.log(prop.payload);
  }, []);
  return <>asc</>;
};

export default choosenFood;
