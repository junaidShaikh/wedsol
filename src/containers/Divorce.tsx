import styled from 'styled-components/macro';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import DivorceForm from 'components/forms/DivorceForm';

const DivorceWrapper = styled.main`
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

const Divorce = (): JSX.Element => {
  return (
    <DivorceWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Initiating Divorce</SectionTitle>
      <DivorceForm />
    </DivorceWrapper>
  );
};

export default Divorce;
