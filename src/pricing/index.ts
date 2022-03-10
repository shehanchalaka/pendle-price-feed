import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { SushiPair as SushiPairContract } from "../../generated/templates/SushiPair/SushiPair";
import { TokenUtils } from "../entities";
import {
  ONE_BD,
  POOL_PENDLE_X_WETH,
  POOL_USDC_X_WETH,
  TOKEN_PENDLE,
  TOKEN_USDC,
  TOKEN_WETH,
  ZERO_BD,
} from "../utils/constants";

export function getTokenPrice(id: string): BigDecimal {
  if (id == TOKEN_PENDLE) {
    return getPendlePrice();
  } else if (id == TOKEN_USDC) {
    return ONE_BD;
  } else if (id == TOKEN_WETH) {
    return getEthPrice();
  }

  return ZERO_BD;
}

export function getPendlePrice(): BigDecimal {
  let pendlePriceInEth = getPriceOfTokenInPool(
    TOKEN_PENDLE,
    POOL_PENDLE_X_WETH
  );
  let wethPrice = getEthPrice();
  return pendlePriceInEth.times(wethPrice);
}

export function getEthPrice(): BigDecimal {
  return getPriceOfTokenInPool(TOKEN_WETH, POOL_USDC_X_WETH);
}

export function getPriceOfTokenInPool(
  tokenAddress: string,
  marketAddress: string
): BigDecimal {
  let contract = SushiPairContract.bind(Address.fromString(marketAddress));
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
