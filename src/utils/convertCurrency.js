export const convertCurrency = (value) => {
  return parseFloat(value).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
}