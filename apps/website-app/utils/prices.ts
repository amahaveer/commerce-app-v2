export function getFormattedPrice(price?: number, fraction?: number): number {
    const divider = 10 ** (fraction || 2)
    const priceToFormate = price || 0
    return parseFloat((priceToFormate / divider).toFixed(fraction))
}