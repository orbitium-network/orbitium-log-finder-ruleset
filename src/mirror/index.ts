import { LogFindersActionRuleSet } from "../types"
import { createMirrorRules } from "./rules"
import { mainnet, testnet } from "./addresses"

const create = (network: string) => {
  const addresses = network === "mainnet" ? mainnet : testnet
  const rules = createMirrorRules(addresses)

  const openPositionRuleSet: LogFindersActionRuleSet = {
    rule: rules.openPosition,
    transform: (fragment, matched) => ({
      msgType: "mirror/open-position",
      canonicalMsg: [
        `Deposit ${matched[4].value} (Position ID: ${matched[0]})`,
        `Mint ${matched[3].value}`,
      ],
      payload: fragment,
    }),
  }

  const depositRuleSet: LogFindersActionRuleSet = {
    rule: rules.depositRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/deposit",
      canonicalMsg: [
        `Deposit ${matched[3].value} (Position ID: ${matched[2].value})`,
      ],
      payload: fragment,
    }),
  }

  const withdrawRuleSet: LogFindersActionRuleSet = {
    rule: rules.withdrawRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/withdraw",
      canonicalMsg: [
        `Withdraw ${matched[3].value} (Position ID: ${matched[2].value})`,
      ],
      payload: fragment,
    }),
  }

  const burnRuleSet: LogFindersActionRuleSet = {
    rule: rules.burnRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/burn",
      canonicalMsg: [
        `Burn ${matched[8].value} (Position ID: ${matched[7].value})`,
      ],
      payload: fragment,
    }),
  }

  const stakeLPRuleSet: LogFindersActionRuleSet = {
    rule: rules.stakeLPRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/stake-LP",
      canonicalMsg: [`Stake ${matched[8].value}${matched[0].value}`],
      payload: fragment,
    }),
  }

  const unstakeLPRuleSet: LogFindersActionRuleSet = {
    rule: rules.unstakeLPRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/unstake-LP",
      canonicalMsg: [`Unstake ${matched[8].value}${matched[4].value}`],
      payload: fragment,
    }),
  }

  const unstakeLPRuleSetTypeB: LogFindersActionRuleSet = {
    rule: rules.unstakeLPRuleTypeB,
    transform: (fragment, matched) => ({
      msgType: "mirror/unstake-LP",
      canonicalMsg: [`Unstake ${matched[9].value}${matched[5].value}`],
      payload: fragment,
    }),
  }

  const lpStakingRewardRuleSet: LogFindersActionRuleSet = {
    rule: rules.lpStakingRewardRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/LP-staking-reward",
      canonicalMsg: [`Claim Reward ${matched[7].value}${matched[3].value}`],
      payload: fragment,
    }),
  }

  const govStakeRuleSet: LogFindersActionRuleSet = {
    rule: rules.govStakeRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/governance-stake",
      canonicalMsg: [
        `Stake ${matched[4].value}${matched[0].value} to ${matched[5].value}`,
      ],
      payload: fragment,
    }),
  }

  const govUnstakeRuleSet: LogFindersActionRuleSet = {
    rule: rules.govUnstakeRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/governance-unstake",
      canonicalMsg: [
        `Unstake ${matched[3].value}${matched[4].value} to ${matched[0].value}`,
      ],
      payload: fragment,
    }),
  }

  const createPollRuleSet: LogFindersActionRuleSet = {
    rule: rules.createPollRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/create-poll",
      canonicalMsg: [`Create Poll (Poll ID: ${matched[8].value})`],
      payload: fragment,
    }),
  }

  const castVoteRuleSet: LogFindersActionRuleSet = {
    rule: rules.castVoteRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/cast-vote",
      canonicalMsg: [
        `Vote to Poll (Poll ID: ${matched[2].value}) (${matched[5].value})`,
      ],
      payload: fragment,
    }),
  }

  const airdropRuleSet: LogFindersActionRuleSet = {
    rule: rules.airdropRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/airdrop",
      canonicalMsg: [`Claim ${matched[4].value}${matched[5].value}`],
      payload: fragment,
    }),
  }

  const buySubmitOrderRuleSet: LogFindersActionRuleSet = {
    rule: rules.buySubmitOrderRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/submit-order-buy",
      canonicalMsg: [
        `Order to buy ${matched[5].value} with ${matched[4].value}`,
      ],
      payload: fragment,
    }),
  }

  const sellSubmitOrderRuleSet: LogFindersActionRuleSet = {
    rule: rules.sellSubmitOrderRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/submit-order-sell",
      canonicalMsg: [
        `Order to sell ${matched[9].value} for ${matched[10].value}`,
      ],
      payload: fragment,
    }),
  }

  const cancelOrderRuleSet: LogFindersActionRuleSet = {
    rule: rules.cancelOrderRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/cancel-order",
      canonicalMsg: [`Canceled limit order ID:${matched[2].value}`],
      payload: fragment,
    }),
  }

  const buyExecuteOrderRuleSet: LogFindersActionRuleSet = {
    rule: rules.buyExecuteOrderRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/execute-order-buy",
      canonicalMsg: [`Bought ${matched[9].value} with ${matched[8].value}`],
      payload: fragment,
    }),
  }

  const sellExecuteOrderRuleSet: LogFindersActionRuleSet = {
    rule: rules.sellExecuteOrderRule,
    transform: (fragment, matched) => ({
      msgType: "mirror/execute-order-sell",
      canonicalMsg: [`Sold ${matched[3].value} for ${matched[4].value}`],
      payload: fragment,
    }),
  }

  const lpStakeRuleSet: LogFindersActionRuleSet = {
    rule: rules.longFarm,
    transform: (fragment, matched) => ({
      msgType: "mirror/LP-stake",
      canonicalMsg: [`Stake LP to ${matched[0].value}`],
      payload: fragment,
    }),
  }

  const borrowRuleSet: LogFindersActionRuleSet = {
    rule: rules.borrow,
    transform: (fragment, matched) => ({
      msgType: "mirror/borrow",
      canonicalMsg: [`Mint ${matched[3].value} with ${matched[4].value}`],
      payload: fragment,
    }),
  }

  const unlockAmountRuleSet: LogFindersActionRuleSet = {
    rule: rules.unlockAmount,
    transform: (fragment, matched) => ({
      msgType: "mirror/unlock-amount",
      canonicalMsg: [`Unlock ${matched[2].value}`],
      payload: fragment,
    }),
  }

  return [
    openPositionRuleSet,
    depositRuleSet,
    withdrawRuleSet,
    burnRuleSet,
    stakeLPRuleSet,
    unstakeLPRuleSet,
    unstakeLPRuleSetTypeB,
    lpStakingRewardRuleSet,
    govStakeRuleSet,
    govUnstakeRuleSet,
    createPollRuleSet,
    castVoteRuleSet,
    airdropRuleSet,
    buySubmitOrderRuleSet,
    sellSubmitOrderRuleSet,
    cancelOrderRuleSet,
    buyExecuteOrderRuleSet,
    sellExecuteOrderRuleSet,
    lpStakeRuleSet,
    borrowRuleSet,
    unlockAmountRuleSet,
  ]
}

export default create
