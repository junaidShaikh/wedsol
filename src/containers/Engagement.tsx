import styled from 'styled-components/macro';
import { IoLink, IoLogoTwitter, IoLogoFacebook } from 'react-icons/io5';

import Container from 'components/common/wrappers/Container';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import EngagementCard from 'components/EngagementCard';

import previewRing1 from 'assets/images/preview-ring-1.png';
import previewRing2 from 'assets/images/preview-ring-2.png';

const EngagementWrapper = styled.main`
  width: 100%;
  height: 100vh;

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
              proposerName="Rahul"
              spouseName="Priyanka"
              engagementDate={Date().toString()}
              proposerRing={previewRing1}
              spouseRing={previewRing2}
              signedBy={['Rahul Kumar', 'Priyanka Bedi']}
              qrCodeString="Hello World"
            />
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </Container>
    </EngagementWrapper>
  );
};

export default Engagement;
