import * as React from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import config from 'config';

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
  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();

  const history = useHistory();

  const location = useLocation<{ proposalTransaction: string; spouseName: string; message: string; ring: number }>();

  React.useEffect(() => {
    if (!proposalPubKey) {
      history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SuccessfullyMintedWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Successfully Minted</SectionTitle>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper>
            <div style={{ width: '100%', maxWidth: 455, margin: '0 auto' }}>
              <CopyText className="copy-text" text={`${window.location.origin}/proposal/${proposalPubKey}/accept`} />
              <BlockConfirmations
                className="block-confirmations"
                confirmedBlocks={Math.ceil(Math.random() * 290)}
                totalBlocks={290}
              />
              <ViewOnExplorer
                href={config.generateSolanaExplorerBaseUrl(location.state.proposalTransaction)}
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <NftRingPreview
              spouseName={location.state?.spouseName}
              message={location.state?.message}
              ring={location.state?.ring}
            />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </SuccessfullyMintedWrapper>
  );
};

export default SuccessfullyMinted;
