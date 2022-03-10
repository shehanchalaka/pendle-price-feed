import {
  BigDecimal,
  BigInt,
  dataSource,
  ethereum,
} from "@graphprotocol/graph-ts";
import { Sync as SyncEvent } from "../../generated/SushiFactory/SushiPair";
import { TokenUtils } from "../entities";
import { getTokenPrice } from "../pricing";
import { recordSLPTokenPrice, recordTokenPrice } from "../helpers/updates";
import {
  initializeOTMarkets,
  initializeYTMarkets,
} from "../helpers/init-avalanche";

export function handleBlock(event: ethereum.Block): void {
  if (event.number.equals(BigInt.fromI32(6725074))) {
    // this will only run once
    initializeOTMarkets();
    initializeYTMarkets();
  }
}

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

  let baseToken = new TokenUtils(baseTokenAddress);
  let quoteToken = new TokenUtils(quoteTokenAddress);

  let baseTokenBalance: BigDecimal;
  let quoteTokenBalance: BigDecimal;

  if (quoteTokenIndex == 0) {
    baseTokenBalance = baseToken.volumeOf(event.params.reserve1);
    quoteTokenBalance = quoteToken.volumeOf(event.params.reserve0);
  } else {
    baseTokenBalance = baseToken.volumeOf(event.params.reserve0);
    quoteTokenBalance = quoteToken.volumeOf(event.params.reserve1);
  }

  let quoteTokenPrice = getTokenPrice(quoteTokenAddress);
  let baseTokenPrice = quoteTokenBalance
    .times(quoteTokenPrice)
    .div(baseTokenBalance);

  // at this point what prices do you want to record
  // lp ? ot ? lp ot both ?
  if (syncAction == "base-only" || syncAction == "both") {
    recordTokenPrice(hash, timestamp, block, baseTokenAddress, baseTokenPrice);
  }

  if (syncAction == "lp-only" || syncAction == "both") {
    recordSLPTokenPrice(
      hash,
      timestamp,
      block,
      marketAddress,
      quoteTokenBalance,
      quoteTokenPrice
    );
  }
}
