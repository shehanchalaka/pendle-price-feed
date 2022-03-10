import { Address, DataSourceContext } from "@graphprotocol/graph-ts";
import { Market } from "../../generated/schema";
import { TraderJoePair as TraderJoePairTemplate } from "../../generated/templates";
import { PendleMarket as PendleMarketTemplate } from "../../generated/templates";
import {
  POOL_OT_JLP_WAVAX_PENDLE_28_DEC_2023_X_PENDLE,
  POOL_OT_QIAVAX_28_DEC_2023_X_USDC,
  POOL_OT_QIUSDC_28_DEC_2023_X_USDC,
  POOL_OT_WMEMO_24_FEB_2022_X_MIM,
  POOL_OT_XJOE_30_JUN_2022_X_USDC,
  POOL_WAVAX_X_PENDLE,
  POOL_YT_JLP_WAVAX_PENDLE_28_DEC_2023_X_PENDLE,
  POOL_YT_QIAVAX_28_DEC_2023_X_USDC,
  POOL_YT_QIUSDC_28_DEC_2023_X_USDC,
  POOL_YT_WMEMO_24_FEB_2022_X_MIM,
  POOL_YT_XJOE_30_JUN_2022_X_USDC,
  TOKEN_MIM,
  TOKEN_OT_JLP_WAVAX_PENDLE_28_DEC_2023,
  TOKEN_OT_QIAVAX_28_DEC_2023,
  TOKEN_OT_QIUSDC_28_DEC_2023,
  TOKEN_OT_WMEMO_24_FEB_2022,
  TOKEN_OT_XJOE_30_JUN_2022,
  TOKEN_PENDLE,
  TOKEN_USDC,
  TOKEN_WAVAX,
  TOKEN_YT_JLP_WAVAX_PENDLE_28_DEC_2023,
  TOKEN_YT_QIAVAX_28_DEC_2023,
  TOKEN_YT_QIUSDC_28_DEC_2023,
  TOKEN_YT_WMEMO_24_FEB_2022,
  TOKEN_YT_XJOE_30_JUN_2022,
} from "../utils/constants/avalanche";

export function initializeOTMarkets(): void {
  createNewMarket(
    POOL_OT_QIUSDC_28_DEC_2023_X_USDC,
    TOKEN_OT_QIUSDC_28_DEC_2023,
    TOKEN_USDC,
    "ot",
    0,
    "base-only"
  );
  createNewMarket(
    POOL_OT_QIAVAX_28_DEC_2023_X_USDC,
    TOKEN_OT_QIAVAX_28_DEC_2023,
    TOKEN_USDC,
    "ot",
    0,
    "base-only"
  );
  createNewMarket(
    POOL_OT_JLP_WAVAX_PENDLE_28_DEC_2023_X_PENDLE,
    TOKEN_OT_JLP_WAVAX_PENDLE_28_DEC_2023,
    TOKEN_PENDLE,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_OT_XJOE_30_JUN_2022_X_USDC,
    TOKEN_OT_XJOE_30_JUN_2022,
    TOKEN_USDC,
    "ot",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_OT_WMEMO_24_FEB_2022_X_MIM,
    TOKEN_OT_WMEMO_24_FEB_2022,
    TOKEN_MIM,
    "ot",
    0,
    "base-only"
  );
  createNewMarket(
    POOL_WAVAX_X_PENDLE,
    TOKEN_PENDLE,
    TOKEN_WAVAX,
    "generic",
    1,
    "lp-only"
  );
}

export function initializeYTMarkets(): void {
  createNewMarket(
    POOL_YT_QIUSDC_28_DEC_2023_X_USDC,
    TOKEN_YT_QIUSDC_28_DEC_2023,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_QIAVAX_28_DEC_2023_X_USDC,
    TOKEN_YT_QIAVAX_28_DEC_2023,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_JLP_WAVAX_PENDLE_28_DEC_2023_X_PENDLE,
    TOKEN_YT_JLP_WAVAX_PENDLE_28_DEC_2023,
    TOKEN_PENDLE,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_XJOE_30_JUN_2022_X_USDC,
    TOKEN_YT_XJOE_30_JUN_2022,
    TOKEN_USDC,
    "yt",
    1,
    "base-only"
  );
  createNewMarket(
    POOL_YT_WMEMO_24_FEB_2022_X_MIM,
    TOKEN_YT_WMEMO_24_FEB_2022,
    TOKEN_MIM,
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
    TraderJoePairTemplate.createWithContext(
      Address.fromString(marketAddress),
      context
    );
  }
}
