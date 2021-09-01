import { proxy } from 'valtio';

interface State {
  isWalletConnected: boolean;
  walletAddress: string;
  autoApprove: boolean;
}

const state = proxy<State>({
  isWalletConnected: false,
  walletAddress: '',
  autoApprove: false,
});

export { state };
