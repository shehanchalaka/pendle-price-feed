import { BigDecimal, dataSource } from "@graphprotocol/graph-ts";
import { Sync as SyncEvent } from "../../generated/templates/PendleMarket/PendleMarket";
import { TokenUtils } from "../entities";
import { recordPendleLPTokenPrice, recordTokenPrice } from "../helpers/updates";
import { getTokenPrice } from "../pricing";
import { ONE_BD, RONE_BD } from "../utils/constants";

export function handleSync(event: SyncEvent): void {
  let hash = event.transaction.hash.toHexString();
  let timestamp = event.block.timestamp;
  let block = event.block.number;

  let context = dataSource.context();
  let marketAddress = context.getString("marketAddress");
  let baseTokenAddress = context.getString("baseToken");
  let quoteTokenAddress = context.getString("quoteToken");
  // which token (token0 or token1) is the quote token (ex: USDC, PENDLE)
  let quoteTokenIndex = context.getI32("quoteTokenIndex");
  // find price of "base-only", "lp-only", "both"
  let syncAction = context.getString("syncAction");

  // base token is YT
  let baseToken = new TokenUtils(baseTokenAddress);
  let quoteToken = new TokenUtils(quoteTokenAddress);

  // reserve0 is always YT
  let baseTokenBalance = baseToken.volumeOf(event.params.reserve0);
  let quoteTokenBalance = quoteToken.volumeOf(event.params.reserve1);

  let baseTokenWeight = event.params.weight0.toBigDecimal().div(RONE_BD);
  let quoteTokenWeight = ONE_BD.minus(baseTokenWeight);

  let quoteTokenPrice = getTokenPrice(quoteTokenAddress);

  let tvl = quoteTokenBalance.times(quoteTokenPrice).div(quoteTokenWeight);

  let baseTokenPrice = tvl.times(baseTokenWeight).div(baseTokenBalance);

  if (syncAction == "base-only" || syncAction == "both") {
    recordTokenPrice(hash, timestamp, block, baseTokenAddress, baseTokenPrice);
  }

  if (syncAction == "lp-only" || syncAction == "both") {
    recordPendleLPTokenPrice(hash, timestamp, block, marketAddress, tvl);
  }
}
