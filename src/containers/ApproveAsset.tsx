import * as React from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory } from 'react-router-dom';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import ApproveAssetForm from 'components/forms/ApproveAssetForm';

const ApproveAssetWrapper = styled.main`
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
    margin-top: 20px;
    margin-bottom: 64px;
  }
`;

const ApproveAsset = (): JSX.Element => {
  const { proposalPubKey, ipfsCid } = useParams<{ proposalPubKey: string; ipfsCid: string }>();
  const history = useHistory();

  React.useEffect(() => {
    if (!proposalPubKey || !ipfsCid) {
      history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApproveAssetWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Approve An Asset</SectionTitle>
      <ApproveAssetForm />
    </ApproveAssetWrapper>
  );
};

export default ApproveAsset;
