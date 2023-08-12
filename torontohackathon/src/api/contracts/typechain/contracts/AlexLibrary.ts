/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from '../common';

export declare namespace AlexLibrary {
  export type RewardStruct = {
    rewardToken: string;
    rewardPerAddress: BigNumberish;
    rewardAddressCap: BigNumberish;
    rewardDistributed: BigNumberish;
  };

  export type RewardStructOutput = [string, BigNumber, BigNumber, BigNumber] & {
    rewardToken: string;
    rewardPerAddress: BigNumber;
    rewardAddressCap: BigNumber;
    rewardDistributed: BigNumber;
  };
}

export interface AlexLibraryInterface extends utils.Interface {
  functions: {
    'author()': FunctionFragment;
    'card()': FunctionFragment;
    'checkAnswer(uint256,string[])': FunctionFragment;
    'getRatings(uint256)': FunctionFragment;
    'learnProgram(uint256,string[])': FunctionFragment;
    'newProgram(string,string,(address,uint256,uint256,uint256),string[])': FunctionFragment;
    'programCounter()': FunctionFragment;
    'programs(uint256)': FunctionFragment;
    'rateProgram(uint256,uint256)': FunctionFragment;
    'ratings(uint256,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'author'
      | 'card'
      | 'checkAnswer'
      | 'getRatings'
      | 'learnProgram'
      | 'newProgram'
      | 'programCounter'
      | 'programs'
      | 'rateProgram'
      | 'ratings',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'author', values?: undefined): string;
  encodeFunctionData(functionFragment: 'card', values?: undefined): string;
  encodeFunctionData(functionFragment: 'checkAnswer', values: [BigNumberish, string[]]): string;
  encodeFunctionData(functionFragment: 'getRatings', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'learnProgram', values: [BigNumberish, string[]]): string;
  encodeFunctionData(
    functionFragment: 'newProgram',
    values: [string, string, AlexLibrary.RewardStruct, string[]],
  ): string;
  encodeFunctionData(functionFragment: 'programCounter', values?: undefined): string;
  encodeFunctionData(functionFragment: 'programs', values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: 'rateProgram', values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'ratings', values: [BigNumberish, BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'author', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'card', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'checkAnswer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getRatings', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'learnProgram', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'newProgram', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'programCounter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'programs', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rateProgram', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'ratings', data: BytesLike): Result;

  events: {};
}

export interface AlexLibrary extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AlexLibraryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    author(overrides?: CallOverrides): Promise<[string]>;

    card(overrides?: CallOverrides): Promise<[string]>;

    checkAnswer(id: BigNumberish, _answer: string[], overrides?: CallOverrides): Promise<[boolean]>;

    getRatings(id: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber[]]>;

    learnProgram(
      id: BigNumberish,
      _answer: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    newProgram(
      _title: string,
      _cid: string,
      _reward: AlexLibrary.RewardStruct,
      _answers: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    programCounter(overrides?: CallOverrides): Promise<[BigNumber] & { _value: BigNumber }>;

    programs(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, string, string, string, string, AlexLibrary.RewardStructOutput] & {
        id: BigNumber;
        owner: string;
        title: string;
        cid: string;
        certificate: string;
        reward: AlexLibrary.RewardStructOutput;
      }
    >;

    rateProgram(
      id: BigNumberish,
      rating: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    ratings(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };

  author(overrides?: CallOverrides): Promise<string>;

  card(overrides?: CallOverrides): Promise<string>;

  checkAnswer(id: BigNumberish, _answer: string[], overrides?: CallOverrides): Promise<boolean>;

  getRatings(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;

  learnProgram(
    id: BigNumberish,
    _answer: string[],
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  newProgram(
    _title: string,
    _cid: string,
    _reward: AlexLibrary.RewardStruct,
    _answers: string[],
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  programCounter(overrides?: CallOverrides): Promise<BigNumber>;

  programs(
    arg0: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<
    [BigNumber, string, string, string, string, AlexLibrary.RewardStructOutput] & {
      id: BigNumber;
      owner: string;
      title: string;
      cid: string;
      certificate: string;
      reward: AlexLibrary.RewardStructOutput;
    }
  >;

  rateProgram(
    id: BigNumberish,
    rating: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  ratings(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    author(overrides?: CallOverrides): Promise<string>;

    card(overrides?: CallOverrides): Promise<string>;

    checkAnswer(id: BigNumberish, _answer: string[], overrides?: CallOverrides): Promise<boolean>;

    getRatings(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;

    learnProgram(id: BigNumberish, _answer: string[], overrides?: CallOverrides): Promise<void>;

    newProgram(
      _title: string,
      _cid: string,
      _reward: AlexLibrary.RewardStruct,
      _answers: string[],
      overrides?: CallOverrides,
    ): Promise<void>;

    programCounter(overrides?: CallOverrides): Promise<BigNumber>;

    programs(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, string, string, string, string, AlexLibrary.RewardStructOutput] & {
        id: BigNumber;
        owner: string;
        title: string;
        cid: string;
        certificate: string;
        reward: AlexLibrary.RewardStructOutput;
      }
    >;

    rateProgram(id: BigNumberish, rating: BigNumberish, overrides?: CallOverrides): Promise<void>;

    ratings(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    author(overrides?: CallOverrides): Promise<BigNumber>;

    card(overrides?: CallOverrides): Promise<BigNumber>;

    checkAnswer(id: BigNumberish, _answer: string[], overrides?: CallOverrides): Promise<BigNumber>;

    getRatings(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    learnProgram(
      id: BigNumberish,
      _answer: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    newProgram(
      _title: string,
      _cid: string,
      _reward: AlexLibrary.RewardStruct,
      _answers: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    programCounter(overrides?: CallOverrides): Promise<BigNumber>;

    programs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rateProgram(
      id: BigNumberish,
      rating: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    ratings(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    author(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    card(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    checkAnswer(
      id: BigNumberish,
      _answer: string[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getRatings(id: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    learnProgram(
      id: BigNumberish,
      _answer: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    newProgram(
      _title: string,
      _cid: string,
      _reward: AlexLibrary.RewardStruct,
      _answers: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    programCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    programs(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rateProgram(
      id: BigNumberish,
      rating: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    ratings(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
