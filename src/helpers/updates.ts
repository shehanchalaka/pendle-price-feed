import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { SushiPair as SushiPairContract } from "../../generated/templates/SushiPair/SushiPair";
import { PriceHistory } from "../../generated/schema";
import { loadToken, TokenUtils } from "../entities";
import { TWO_BD } from "../utils/constants";

export function recordTokenPrice(
  hash: string,
  timestamp: BigInt,
  block: BigInt,
  tokenAddress: string,
  tokenPrice: BigDecimal
): void {
  // STEP 1: Update current price
  let token = loadToken(tokenAddress);
  token.currentPrice = tokenPrice;
  token.save();

  // STEP 2: Push to price history
  let priceHistory = new PriceHistory(hash);
  priceHistory.hash = hash;
  priceHistory.timestamp = timestamp;
  priceHistory.block = block;
  priceHistory.token = tokenAddress;
  priceHistory.priceUSD = tokenPrice;
  priceHistory.save();
}

export function recordSLPTokenPrice(
  hash: string,
  timestamp: BigInt,
  block: BigInt,
  marketAddress: string,
  tokenBalance: BigDecimal,
  tokenPrice: BigDecimal
): void {
  let totalSupply = new TokenUtils(marketAddress).getTotalSupply();

  let lpPrice = tokenBalance
    .times(tokenPrice)
    .times(TWO_BD)
    .div(totalSupply);

  recordTokenPrice(hash, timestamp, block, marketAddress, lpPrice);
}

export function recordPendleLPTokenPrice(
  hash: string,
  timestamp: BigInt,
  block: BigInt,
  marketAddress: string,
  tvl: BigDecimal
): void {
  let totalSupply = new TokenUtils(marketAddress).getTotalSupply();

  let lpPrice = tvl.div(totalSupply);

  recordTokenPrice(hash, timestamp, block, marketAddress, lpPrice);
}
