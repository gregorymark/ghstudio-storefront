import * as Yup from "yup"

const ERRORS = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Not a valid email",
}

const stringReqWhenTrue = {
  is: true,
  then: Yup.string().required(ERRORS.REQUIRED),
}

const Validator = {
  loginSchema: Yup.object({
    email: Yup.string().email("Invalid email").required(ERRORS.REQUIRED),
    password: Yup.string().required(ERRORS.REQUIRED),
  }),
  registerSchema: Yup.object({
    first_name: Yup.string().required(ERRORS.REQUIRED),
    last_name: Yup.string().required(ERRORS.REQUIRED),
    email: Yup.string().email(ERRORS.INVALID_EMAIL).required(ERRORS.REQUIRED),
    phone: Yup.string().optional(),
    password: Yup.string().required(ERRORS.REQUIRED),
  }),
  checkout: {
    contactSchema: Yup.object({
      email: Yup.string().email(ERRORS.INVALID_EMAIL).required(ERRORS.REQUIRED),
    }).required(ERRORS.REQUIRED),
    addressSchema: Yup.object({
      shipping_address: Yup.object({
        first_name: Yup.string().required(ERRORS.REQUIRED),
        last_name: Yup.string().required(ERRORS.REQUIRED),
        address_1: Yup.string().required(ERRORS.REQUIRED),
        address_2: Yup.string().optional(),
        country_code: Yup.string().required(ERRORS.REQUIRED),
        city: Yup.string().required(ERRORS.REQUIRED),
        province: Yup.string().optional(),
        postal_code: Yup.string().required(ERRORS.REQUIRED),
        phone: Yup.string().optional(),
      }),
      billing_address: Yup.object({
        is_different: Yup.boolean().optional(),
        first_name: Yup.string().when(
          "is_different",
          stringReqWhenTrue
        ),
        last_name: Yup.string().when(
          "is_different",
          stringReqWhenTrue
        ),
        address_1: Yup.string().when(
          "is_different",
          stringReqWhenTrue
        ),
        address_2: Yup.string().optional(),
        country_code: Yup.string().when(
          "is_different",
          stringReqWhenTrue
        ),
        city: Yup.string().when(
          "is_different",
          stringReqWhenTrue
        ),
        province: Yup.string().optional(),
        postal_code: Yup.string().when(
          "is_different",
          stringReqWhenTrue
        ),
        phone: Yup.string().optional(),
      }),
    }).required(ERRORS.REQUIRED),
    shippingMethodSchema: Yup.object({
      option_id: Yup.string().required(ERRORS.REQUIRED),
    }).required(),
  },
}

export default Validator
