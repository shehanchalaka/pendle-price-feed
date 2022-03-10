import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { TraderJoePair as TraderJoePairContract } from "../../generated/templates/TraderJoePair/TraderJoePair";
import { TokenUtils } from "../entities";
import { ONE_BD, ZERO_BD } from "../utils/constants";
import {
  POOL_WAVAX_X_PENDLE,
  POOL_USDC_WAVAX,
  TOKEN_PENDLE,
  TOKEN_USDC,
  TOKEN_WAVAX,
} from "../utils/constants/avalanche";

export function getTokenPrice(id: string): BigDecimal {
  if (id == TOKEN_PENDLE) {
    return getPendlePrice();
  } else if (id == TOKEN_USDC) {
    return ONE_BD;
  } else if (id == TOKEN_WAVAX) {
    return getAvaxPrice();
  }

  // TODO
  // findTokenPrice()

  return ZERO_BD;
}

function getPendlePrice(): BigDecimal {
  let pendlePriceInEth = getPriceOfTokenInPool(
    TOKEN_PENDLE,
    POOL_WAVAX_X_PENDLE
  );
  let wavaxPrice = getAvaxPrice();
  return pendlePriceInEth.times(wavaxPrice);
}

function getAvaxPrice(): BigDecimal {
  return getPriceOfTokenInPool(TOKEN_WAVAX, POOL_USDC_WAVAX);
}

function getPriceOfTokenInPool(
  tokenAddress: string,
  marketAddress: string
): BigDecimal {
  let contract = TraderJoePairContract.bind(Address.fromString(marketAddress));
  let token0 = new TokenUtils(contract.token0().toHexString());
  let token1 = new TokenUtils(contract.token1().toHexString());
  let reserves = contract.getReserves();
  let balance0 = token0.volumeOf(reserves.value0);
  let balance1 = token1.volumeOf(reserves.value1);

  if (tokenAddress == token0.getAddress()) {
    return balance1.div(balance0);
  } else {
    return balance0.div(balance1);
  }
}
