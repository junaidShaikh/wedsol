import styled from 'styled-components/macro';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

import poweredBySolana from 'assets/logos/powered-by-solana.png';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 120px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;

  & > ${FlexRowWrapper} {
    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: center;

    .powered-by-solana {
      max-width: 242px;
    }
  }
`;

const Footer = (): JSX.Element => {
  return (
    <FooterWrapper>
      <FlexRowWrapper>
        <img src={poweredBySolana} alt="Powered by Solana" className="powered-by-solana" />
      </FlexRowWrapper>
    </FooterWrapper>
  );
};

export default Footer;
