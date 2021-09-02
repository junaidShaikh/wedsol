import styled from 'styled-components/macro';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import ProposalStages from 'components/ProposalStages';

const ProposalWrapper = styled.main`
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
    font-size: 55px;
    line-height: 73px;
    margin-bottom: 64px;
  }
`;

const Proposal = (): JSX.Element => {
  return (
    <ProposalWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Start a new proposal</SectionTitle>
      <ProposalStages />
    </ProposalWrapper>
  );
};

export default Proposal;
