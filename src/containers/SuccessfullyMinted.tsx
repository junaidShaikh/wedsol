import styled from 'styled-components/macro';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import NftRingPreview from 'components/NftRingPreview';
import ViewOnExplorer from 'components/ViewOnExplorer';
import BlockConfirmations from 'components/BlockConfirmations';
import CopyText from 'components/CopyText';

const SuccessfullyMintedWrapper = styled.main`
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
    margin-bottom: 70px;
  }

  & > ${Container} > ${FlexRowWrapper} > ${FlexColumnWrapper} {
    flex: 0 1 50%;

    align-items: center;
    justify-content: flex-start;
  }

  .copy-text {
    margin-bottom: 38px;
  }

  .block-confirmations {
    margin-bottom: 50px;
  }
`;

const SuccessfullyMinted = (): JSX.Element => {
  return (
    <SuccessfullyMintedWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Successfully Minted</SectionTitle>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper>
            <div style={{ width: '100%', maxWidth: 455, margin: '0 auto' }}>
              <CopyText className="copy-text" text="app.wedsol.com/proposal/1" />
              <BlockConfirmations className="block-confirmations" confirmedBlocks={190} totalBlocks={290} />
              <ViewOnExplorer href="https://google.com" target="_blank" />
            </div>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <NftRingPreview />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </SuccessfullyMintedWrapper>
  );
};

export default SuccessfullyMinted;
