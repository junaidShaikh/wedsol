import styled from 'styled-components/macro';

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
  return (
    <AcceptingRingWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Accepting Ring</SectionTitle>
      <AcceptingRingForm proposerName="Rahul" spouseName="Priyanka" qrCodeString="Hello World" />
    </AcceptingRingWrapper>
  );
};

export default AcceptingRing;
