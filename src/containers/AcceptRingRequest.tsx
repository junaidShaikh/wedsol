import * as React from 'react';
import styled from 'styled-components/macro';
import { PublicKey } from '@solana/web3.js';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSnapshot } from 'valtio';

import config from 'config';
import { state } from 'state';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import Container from 'components/common/wrappers/Container';
import AcceptRingRequestCard from 'components/AcceptRingRequestCard';

import rings from 'components/common/rings';
import FullPageSpinner from 'components/common/FullPageSpinner';

const AcceptRingRequestWrapper = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 60px 0 160px 0;

  .connected-account-pill {
    margin-bottom: 20px;
  }

  & > ${Container} {
    max-width: 851px;
  }
`;

const AcceptRingRequest = (): JSX.Element => {
  const snap = useSnapshot(state);

  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();
  const history = useHistory();

  React.useEffect(() => {
    try {
      if (!proposalPubKey) {
        return history.replace('/');
      }

      (async () => {
        if (!state.proposalInfo.data) {
          state.proposalInfo.isLoading = true;
          const programPubKey = new PublicKey(proposalPubKey);
          const accountInfo = await snap.connection.getAccountInfo(programPubKey);
          if (accountInfo === null) {
            throw new Error('Error: cannot find the greeted account');
          } else {
            const endPost = accountInfo.data.indexOf(0);
            const result = JSON.parse(accountInfo.data.slice(0, endPost).toString());

            const { data } = await axios.get(`${config.ipfsGatewayBaseUrl}${result?.info?.substr(0, 46)}`);

            if (data) {
              state.proposalInfo.isLoading = false;
              state.proposalInfo.isSuccess = true;
              state.proposalInfo.data = data;
            } else {
              state.proposalInfo.isLoading = false;
              state.proposalInfo.isSuccess = false;
            }
          }
        }
      })();
    } catch (error) {
      console.log(error);
      state.proposalInfo.isLoading = false;
      state.proposalInfo.isSuccess = false;
      state.proposalInfo.error = error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (snap.proposalInfo.isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <AcceptRingRequestWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <Container>
        <AcceptRingRequestCard
          proposerName={snap.proposalInfo.data?.proposerName ?? ''}
          spouseName={snap.proposalInfo.data?.spouseName ?? ''}
          proposerRing={snap.proposalInfo.data?.ring ?? rings[0]}
          message={snap.proposalInfo.data?.message ?? ''}
          signedBy={[snap.proposalInfo.data?.proposerName as string]}
          qrCodeString={window.location.href}
        />
      </Container>
    </AcceptRingRequestWrapper>
  );
};

export default AcceptRingRequest;
