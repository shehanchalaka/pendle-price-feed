import { BigDecimal, dataSource } from "@graphprotocol/graph-ts";
import { getTokenPrice as getEthereumTokenPrice } from "./ethereum";
import { getTokenPrice as getAvalancheTokenPrice } from "./avalanche";
import { ZERO_BD } from "../utils/constants";

export function getTokenPrice(id: string): BigDecimal {
  let network = dataSource.network();

  if (network == "mainnet") {
    return getEthereumTokenPrice(id);
  } else if (network == "avalanche") {
    return getAvalancheTokenPrice(id);
  }

  return ZERO_BD;
}
