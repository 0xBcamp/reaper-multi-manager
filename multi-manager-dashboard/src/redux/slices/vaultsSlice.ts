import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chain } from './blockchainSlice';
import { ReaperToken } from './reaperSlice';

export interface Vault {
  _id: string;
  address: string;
  asset: string;
  token: string | null;
  decimals: number | null;
  constructionTime: number | null;
  name: string;
  symbol: string;
  chain: Chain;
  lastSnapShot: VaultSnapshot;
  snapshots: VaultSnapshot[];
  strategyCount: number;
  allocatedAPR: number;
  totalAPR: number;
  reaperToken: ReaperToken;
  actualAllocated: number;
  healthScore?: number;
}

export interface VaultTransaction {
  _id: string;
  assets: string;
  block: number;
  chainId: number;
  dateExecuted: number;
  hash: string;
  owner: string;
  receiver: string | null;
  sender: string;
  shares: string;
  transactionType: "Deposit" | "Withdraw" | string;
  vaultAddress: string;
  user: User;
}

export interface VaultSnapshot {
  _id: string;
  depositCount: number;
  deposits: string;
  lockedProfit: string;
  pricePerFullShare: string;
  timestamp: number;
  totalAllocated: string;
  totalAssets: string;
  totalIdle: string;
  totalSupply: string;
  vaultAddress: string;
  withdrawCount: number;
  withdrawals: string;
  lastBlockTimestamp: number;
  totalAllocBPS: string;
  tvlCap: string;
  vault: VaultSnapshot_Vault;
  chainId: number;
  usd: VaultSnapshot_UsdValues
}

export interface VaultSnapshot_Vault {
  _id: string;
  chainId: number;
}

export interface VaultSnapshot_UsdValues {
  tvl: number;
}

export interface User {
  _id: string;
  address: string;
  dateAdded: number;
}

const initialState: {
  vaults: Vault[];
  selectedVaultAddress: string;
  snapshots: VaultSnapshot[];
  vaultTransactions: VaultTransaction[];
} = {
  vaults: [],
  selectedVaultAddress: null,
  snapshots: [],
  vaultTransactions: []
};

const vaultsSlice = createSlice({
  name: 'vaults',
  initialState,
  reducers: {
    setVaults: (state, action: PayloadAction<Vault[]>) => {
      state.vaults = action.payload;
    },
    setSelectedVaultAddress: (state, action: PayloadAction<string>) => {
      state.selectedVaultAddress = action.payload;
    },
    setVaultSnapshots: (state, action: PayloadAction<VaultSnapshot[]>) => {
      state.snapshots = action.payload;
    },
    setVaultTransactions: (state, action: PayloadAction<VaultTransaction[]>) => {
      state.vaultTransactions = action.payload;
    },
  }
});

export const { setVaults, setSelectedVaultAddress, setVaultSnapshots, setVaultTransactions } = vaultsSlice.actions;
export default vaultsSlice.reducer;
