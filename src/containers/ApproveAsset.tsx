import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';

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
  const history = useHistory();

  return (
    <ApproveAssetWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Approve An Asset</SectionTitle>
      <button
        onClick={() => {
          history.push('/divorce');
        }}
      >
        Next
      </button>
    </ApproveAssetWrapper>
  );
};

export default ApproveAsset;
