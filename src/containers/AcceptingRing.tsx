import * as React from 'react';
import styled from 'styled-components/macro';
import { useSnapshot } from 'valtio';
import { useHistory, useParams } from 'react-router-dom';

import { state } from 'state';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import AcceptingRingForm from 'components/forms/AcceptingRingForm';

const AcceptingRingWrapper = styled.main`
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

  .section-title {
    margin-bottom: 64px;
  }
`;

const AcceptingRing = (): JSX.Element => {
  const snap = useSnapshot(state);

  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();
  const history = useHistory();

  React.useEffect(() => {
    if (!proposalPubKey) {
      return history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AcceptingRingWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Accepting Ring</SectionTitle>
      <AcceptingRingForm
        proposerName={snap.proposalInfo.data?.proposerName ?? ''}
        spouseName={snap.proposalInfo.data?.spouseName ?? ''}
        proposerRing={snap.proposalInfo.data?.proposerRing ?? ''}
        qrCodeString={window.location.href}
      />
    </AcceptingRingWrapper>
  );
};

export default AcceptingRing;
