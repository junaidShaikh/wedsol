import * as React from 'react';
import { state } from 'state';

import { getProvider } from 'utils/getProvider';

const Phantom = (): null => {
  const provider = getProvider();

  React.useEffect(() => {
    if (provider) {
      provider.on('connect', () => {
        state.isWalletConnected = true;
        state.walletAddress = provider.publicKey?.toBase58() ?? '';
        state.autoApprove = provider.autoApprove ?? false;
      });

      provider.on('disconnect', () => {
        state.isWalletConnected = false;
        window.location.href = `${window.location.origin}`;
      });

      // try to eagerly connect
      provider.connect({ onlyIfTrusted: true });

      // return () => {
      //   provider.disconnect();
      // };
    }
  }, [provider]);

  return null;
};

export default Phantom;
