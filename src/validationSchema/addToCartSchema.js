import * as Yup from "yup";

export const addToCartSchema = Yup.object().shape({
  cakeMessage: Yup.string()
});
