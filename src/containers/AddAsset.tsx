import styled from 'styled-components/macro';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import AddAssetForm from 'components/forms/AddAssetForm';

const AddAssetWrapper = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 80px 0 160px 0;

  .section-title {
    margin-top: 20px;
    margin-bottom: 64px;
  }
`;

const AddAsset = (): JSX.Element => {
  return (
    <AddAssetWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Add an Asset</SectionTitle>
      <AddAssetForm />
    </AddAssetWrapper>
  );
};

export default AddAsset;
