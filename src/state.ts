import { proxy } from 'valtio';

interface State {
  isWalletConnected: boolean;
  walletAddress: string;
  autoApprove: boolean;
  proposalInfo: {
    isLoading: boolean;
    isSuccess: boolean;
    error: any;
    data: {
      message: string;
      proposerName: string;
      spouseName: string;
      proposerRing: string;
      spouseRing: string;
      signers: string[];
      engagementDate: string;
    } | null;
  };
}

const state = proxy<State>({
  isWalletConnected: false,
  walletAddress: '',
  autoApprove: false,
  proposalInfo: {
    isLoading: true,
    isSuccess: false,
    error: null,
    data: null,
  },
});

export { state };
