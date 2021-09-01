import * as React from 'react';
import { useHistory } from 'react-router';
import { state } from 'state';

import { getProvider } from 'utils/getProvider';

const Phantom = (): null => {
  const history = useHistory();

  const provider = getProvider();

  React.useEffect(() => {
    if (provider) {
      provider.on('connect', () => {
        state.isWalletConnected = true;
        state.walletAddress = provider.publicKey?.toBase58() ?? '';
        state.autoApprove = provider.autoApprove ?? false;
        history.push('/proposal');
      });

      provider.on('disconnect', () => {
        state.isWalletConnected = false;
        history.replace('/');
        alert('Disconnected from wallet');
      });

      // try to eagerly connect
      // provider.connect({ onlyIfTrusted: true });

      return () => {
        provider.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return null;
};

export default Phantom;
