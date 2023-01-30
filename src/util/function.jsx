export function shortenAddress(address, chars = 4) {
  const parsed = address
  return `${parsed.substring(0, chars + 1)}...${parsed.substring(43 - chars)}`
}
