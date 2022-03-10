import { Address, DataSourceContext } from "@graphprotocol/graph-ts";
import { Market } from "../../generated/schema";
import { SushiPair as SushiPairTemplate } from "../../generated/templates";
import { PendleMarket as PendleMarketTemplate } from "../../generated/templates";
import {
  POOL_OT_AUSDC_29_DEC_2022_X_USDC,
  POOL_OT_AUSDC_30_DEC_2021_X_USDC,
  POOL_OT_CDAI_29_DEC_2022_X_USDC,
  POOL_OT_CDAI_30_DEC_2021_X_USDC,
  POOL_OT_SLP_PENDLE_WETH_29_DEC_2022_X_PENDLE,
  POOL_OT_SLP_USDC_WETH_29_DEC_2022_X_USDC,
  POOL_OT_WXBTRFLY_21_APR_2022_X_USDC,
  POOL_PENDLE_X_WETH,
  POOL_USDC_X_WETH,
  POOL_YT_AUSDC_29_DEC_2022_X_USDC,
  POOL_YT_AUSDC_30_DEC_2021_X_USDC,
  POOL_YT_CDAI_29_DEC_2022_X_USDC,
  POOL_YT_CDAI_30_DEC_2021_X_USDC,
  POOL_YT_SLP_PENDLE_WETH_29_DEC_2022_X_PENDLE,
  POOL_YT_SLP_USDC_WETH_29_DEC_2022_X_USDC,
  POOL_YT_WXBTRFLY_21_APR_2022_X_USDC,
  TOKEN_OT_AUSDC_29_DEC_2022,
  TOKEN_OT_AUSDC_30_DEC_2021,
  TOKEN_OT_CDAI_29_DEC_2022,
  TOKEN_OT_CDAI_30_DEC_2021,
  TOKEN_OT_SLP_PENDLE_WETH_29_DEC_2022,
  TOKEN_OT_SLP_USDC_WETH_29_DEC_2022,
  TOKEN_OT_WXBTRFLY_21_APR_2022,
  TOKEN_PENDLE,
  TOKEN_USDC,
  TOKEN_WETH,
  TOKEN_YT_AUSDC_29_DEC_2022,
  TOKEN_YT_AUSDC_30_DEC_2021,
  TOKEN_YT_CDAI_29_DEC_2022,
  TOKEN_YT_CDAI_30_DEC_2021,
  TOKEN_YT_SLP_PENDLE_WETH_29_DEC_2022,
  TOKEN_YT_SLP_USDC_WETH_29_DEC_2022,
  TOKEN_YT_WXBTRFLY_21_APR_2022,
} from "../utils/constants";

export function initializeOTMarkets(): void {
  createNewMarket(
    POOL_OT_AUSDC_29_DEC_2022_X_USDC,
    TOKEN_OT_AUSDC_29_DEC_2022,
    TOKEN_USDC,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_OT_AUSDC_30_DEC_2021_X_USDC,
    TOKEN_OT_AUSDC_30_DEC_2021,
    TOKEN_USDC,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_OT_CDAI_29_DEC_2022_X_USDC,
    TOKEN_OT_CDAI_29_DEC_2022,
    TOKEN_USDC,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_OT_CDAI_30_DEC_2021_X_USDC,
    TOKEN_OT_CDAI_30_DEC_2021,
    TOKEN_USDC,
    "ot",
    0,
    "base-only"
  );
  createNewMarket(
    POOL_OT_SLP_PENDLE_WETH_29_DEC_2022_X_PENDLE,
    TOKEN_OT_SLP_PENDLE_WETH_29_DEC_2022,
    TOKEN_PENDLE,
    "ot",
    0,
    "base-only"
  );
  createNewMarket(
    POOL_OT_SLP_USDC_WETH_29_DEC_2022_X_USDC,
    TOKEN_OT_SLP_USDC_WETH_29_DEC_2022,
    TOKEN_USDC,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_OT_WXBTRFLY_21_APR_2022_X_USDC,
    TOKEN_OT_WXBTRFLY_21_APR_2022,
    TOKEN_USDC,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_PENDLE_X_WETH,
    TOKEN_PENDLE,
    TOKEN_WETH,
    "generic",
    1,
    "lp-only"
  );
  createNewMarket(
    POOL_USDC_X_WETH,
    TOKEN_WETH,
    TOKEN_USDC,
    "generic",
    0,
    "both"
  );
}

export function initializeYTMarkets(): void {
  createNewMarket(
    POOL_YT_AUSDC_29_DEC_2022_X_USDC,
    TOKEN_YT_AUSDC_29_DEC_2022,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_AUSDC_30_DEC_2021_X_USDC,
    TOKEN_YT_AUSDC_30_DEC_2021,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_CDAI_29_DEC_2022_X_USDC,
    TOKEN_YT_CDAI_29_DEC_2022,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_CDAI_30_DEC_2021_X_USDC,
    TOKEN_YT_CDAI_30_DEC_2021,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_SLP_PENDLE_WETH_29_DEC_2022_X_PENDLE,
    TOKEN_YT_SLP_PENDLE_WETH_29_DEC_2022,
    TOKEN_PENDLE,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_SLP_USDC_WETH_29_DEC_2022_X_USDC,
    TOKEN_YT_SLP_USDC_WETH_29_DEC_2022,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_WXBTRFLY_21_APR_2022_X_USDC,
    TOKEN_YT_WXBTRFLY_21_APR_2022,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
}

/**
 *
 * @param marketAddress - market address
 * @param baseToken - the token that you want to find the price of
 * @param quoteToken - quote token
 * @param type - type of the market OT, YT or Generic
 * @param quoteTokenIndex - index of the quote token in the market contract (token0 or token1)
 * @param syncAction - which prices to sync (base token price, LP token price or both)
 */
function createNewMarket(
  marketAddress: string,
  baseToken: string,
  quoteToken: string,
  type: string,
  quoteTokenIndex: i32,
  syncAction: string
): void {
  let market = new Market(marketAddress);
  market.baseToken = baseToken;
  market.quoteToken = quoteToken;
  market.type = type;
  market.save();

  let context = new DataSourceContext();
  context.setString("marketAddress", marketAddress);
  context.setString("baseToken", baseToken);
  context.setString("quoteToken", quoteToken);
  context.setString("type", type);
  context.setI32("quoteTokenIndex", quoteTokenIndex);
  context.setString("syncAction", syncAction);

  if (type == "yt") {
    PendleMarketTemplate.createWithContext(
      Address.fromString(marketAddress),
      context
    );
  } else {
    // OT or Generic markets
    SushiPairTemplate.createWithContext(
      Address.fromString(marketAddress),
      context
    );
  }
}
