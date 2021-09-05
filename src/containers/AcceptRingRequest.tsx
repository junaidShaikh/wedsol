import * as React from 'react';
import styled from 'styled-components/macro';
import { PublicKey } from '@solana/web3.js';
import { useParams, useHistory } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import {
  state,
  setProposalInfoLoading,
  setProposalInfoData,
  setProposalInfoFailure,
  setProposalInfoError,
} from 'state';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import Container from 'components/common/wrappers/Container';
import AcceptRingRequestCard from 'components/AcceptRingRequestCard';
import FullPageSpinner from 'components/common/FullPageSpinner';

import rings from 'components/common/rings';

import getAccountInfo from 'utils/getAccountInfo';
import getActualSigners from 'utils/getActualSigners';
import { fetchIpfsJsonData } from 'apis/ipfs';

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
        setProposalInfoLoading();
        const accountInfo = await getAccountInfo(new PublicKey(proposalPubKey));
        const { data } = await fetchIpfsJsonData(accountInfo?.extra?.substr(0, 46));
        if (data) {
          setProposalInfoData({
            ...data,
            signers: getActualSigners([accountInfo.partner1, accountInfo.partner2]),
          });
        } else {
          setProposalInfoFailure();
        }
      })();
    } catch (error) {
      console.log(error);
      setProposalInfoError(error);
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
          proposalPubKey={proposalPubKey}
          proposerName={snap.proposalInfo.data?.proposerName ?? ''}
          spouseName={snap.proposalInfo.data?.spouseName ?? ''}
          proposerRing={snap.proposalInfo.data?.proposerRing ?? rings[0]}
          message={snap.proposalInfo.data?.message ?? ''}
          signedBy={snap.proposalInfo.data?.signers ?? []}
          qrCodeString={window.location.href}
        />
      </Container>
    </AcceptRingRequestWrapper>
  );
};

export default AcceptRingRequest;
