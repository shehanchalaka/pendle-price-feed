import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export let ZERO_BI = BigInt.fromString("0");
export let ZERO_BD = BigDecimal.fromString("0");

export let ONE_BI = BigDecimal.fromString("1");
export let ONE_BD = BigDecimal.fromString("1");

export let TWO_BI = BigDecimal.fromString("2");
export let TWO_BD = BigDecimal.fromString("2");

export let RONE_BD = BigInt.fromI32(2)
  .pow(40)
  .toBigDecimal();
