import styled from 'styled-components/macro';
import { useSnapshot } from 'valtio';
import { IoLink, IoLogoTwitter, IoLogoFacebook } from 'react-icons/io5';

import { state } from 'state';

import Container from 'components/common/wrappers/Container';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import EngagementCard from 'components/EngagementCard';

import rings from 'components/common/rings';

const EngagementWrapper = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > ${Container} {
    max-width: 851px;
  }

  & > ${Container} > ${FlexColumnWrapper} {
    & > .row-1 {
      justify-content: flex-end;
      margin-bottom: 32px;

      a {
        text-decoration: none;
        color: black;
        margin-right: 20px;

        &:last-of-type {
          margin-right: 0;
        }
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }

    & > .row-2 {
    }
  }
`;

const Engagement = (): JSX.Element => {
  const snap = useSnapshot(state);

  return (
    <EngagementWrapper>
      <Container>
        <FlexColumnWrapper>
          <FlexRowWrapper className="row-1">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <IoLink />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <IoLogoTwitter />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <IoLogoFacebook />
            </a>
          </FlexRowWrapper>
          <FlexRowWrapper className="row-2">
            <EngagementCard
              proposerName={snap.proposalInfo.data?.proposerName ?? ''}
              spouseName={snap.proposalInfo.data?.spouseName ?? ''}
              engagementDate={snap.proposalInfo.data?.engagementDate ?? Date().toString()}
              proposerRing={snap.proposalInfo.data?.proposerRing ?? rings[0]}
              spouseRing={snap.proposalInfo.data?.spouseRing ?? rings[1]}
              signedBy={snap.proposalInfo.data?.signers ?? []}
              qrCodeString={window.location.href}
            />
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </Container>
    </EngagementWrapper>
  );
};

export default Engagement;
