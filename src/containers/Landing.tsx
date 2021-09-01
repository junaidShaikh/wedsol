import styled from 'styled-components/macro';

import SectionTitle from 'components/common/SectionTitle';
import ConnectWalletButton from 'components/ConnectWalletButton';

const LandingWrapper = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .section-title {
    font-size: 55px;
    line-height: 73px;
    margin-bottom: 53px;
  }
`;

const Landing = (): JSX.Element => {
  return (
    <LandingWrapper>
      <SectionTitle className="section-title">Blockchain Marriage Certificates</SectionTitle>
      <ConnectWalletButton />
    </LandingWrapper>
  );
};

export default Landing;
