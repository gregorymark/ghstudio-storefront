export const getCurrencySymbol = currencyCode => {
  switch (currencyCode?.toLowerCase()) {
    case "eur":
      return "€"
    default:
      return "£"
  }
}
