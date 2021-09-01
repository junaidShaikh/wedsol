import styled from 'styled-components/macro';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import SendNftRingForm from 'components/forms/SendNftRingForm';

const SendNFTRingWrapper = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .connected-account-pill {
    position: fixed;
    top: 80px;
  }

  .section-title {
    margin-top: 20px;
    margin-bottom: 42px;
  }
`;

const SendNFTRing = (): JSX.Element => {
  return (
    <SendNFTRingWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Send an NFT Ring</SectionTitle>
      <SendNftRingForm />
    </SendNFTRingWrapper>
  );
};

export default SendNFTRing;
