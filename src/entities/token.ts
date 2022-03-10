import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Token } from "../../generated/schema";
import { ERC20 } from "../../generated/SushiFactory/ERC20";
import { ZERO_BD } from "../utils/constants";
import { pow10 } from "../utils/math";

export function loadToken(id: string): Token {
  let token = Token.load(id);
  if (!token) {
    token = new Token(id);
    let tokenUtils = new TokenUtils(id);
    token.symbol = tokenUtils.getSymbol();
    token.name = tokenUtils.getName();
    token.decimals = tokenUtils.getDecimals();
    token.totalSupply = ZERO_BD;
    token.type = "generic";
    token.save();
  }
  return token;
}

export class TokenUtils {
  private address: string;
  private contract: ERC20;

  constructor(id: string) {
    this.address = id;
    this.contract = ERC20.bind(Address.fromString(id));
  }

  volumeOf(reserves: BigInt): BigDecimal {
    let decimals = this.getDecimals();
    return reserves.toBigDecimal().div(pow10(decimals));
  }

  getAddress(): string {
    return this.address;
  }

  getSymbol(): string {
    let result = this.contract.try_symbol();
    if (result.reverted) {
      return "Unknown";
    }
    return result.value;
  }

  getName(): string {
    let result = this.contract.try_name();
    if (result.reverted) {
      return "Unknown";
    }
    return result.value;
  }

  getDecimals(): BigInt {
    let result = this.contract.try_decimals();
    if (result.reverted) {
      return BigInt.fromI32(0);
    }
    return BigInt.fromI32(result.value);
  }

  getTotalSupply(): BigDecimal {
    let result = this.contract.try_totalSupply();
    if (result.reverted) {
      return BigDecimal.fromString("0");
    }
    let decimals = this.getDecimals();
    return result.value.toBigDecimal().div(pow10(decimals));
  }
}
