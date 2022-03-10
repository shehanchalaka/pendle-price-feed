import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function pow10(n: BigInt): BigDecimal {
  let exp = n.toI32() as u8;
  return BigInt.fromI32(10)
    .pow(exp)
    .toBigDecimal();
}

export function reciprocal(value: BigDecimal): BigDecimal {
  if (value.equals(BigDecimal.fromString("0"))) {
    return BigDecimal.fromString("0");
  }
  return BigDecimal.fromString("1").div(value);
}
