import styled from 'styled-components/macro';
import { IoLink, IoLogoTwitter, IoLogoFacebook } from 'react-icons/io5';

import Container from 'components/common/wrappers/Container';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import SectionTitle from 'components/common/SectionTitle';
import MarriageCertificate from 'components/MarriageCertificate';
import BlessedByCard from 'components/BlessedByCard';
import MarriageInfoCard from 'components/MarriageInfoCard';

const MarriageWrapper = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > ${Container} {
    max-width: 1120px;
  }

  & > ${Container} > ${FlexRowWrapper} {
    justify-content: space-between;

    & > ${FlexColumnWrapper} {
      &:first-of-type {
        flex: 0 1 75%;
      }

      &:last-of-type {
        flex: 0 1 23%;
      }
    }
  }

  & > ${Container} > ${FlexRowWrapper} > .col-1 {
    justify-content: flex-end;

    & > ${FlexRowWrapper} {
      align-items: center;

      margin-bottom: 45px;

      &:last-of-type {
        margin-bottom: 0;
        justify-content: center;
      }

      & > .section-title {
        margin-right: 24px;
      }

      & > p {
        font-family: var(--pt-serif);
        font-weight: normal;
        font-size: 33px;
        line-height: 44px;

        color: rgba(0, 0, 0, 0.47);
      }
    }
  }

  & > ${Container} > ${FlexRowWrapper} > .col-2 {
    & > ${FlexRowWrapper} {
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

    .marriage-info-card {
      margin-bottom: 24px;
    }
  }
`;

const Marriage = (): JSX.Element => {
  return (
    <MarriageWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <FlexRowWrapper>
              <SectionTitle className="section-title">Blockchain Wedding</SectionTitle>
              <p>#2343343</p>
            </FlexRowWrapper>
            <FlexRowWrapper>
              <MarriageCertificate
                proposerName="Rahul"
                spouseName="Priyanka"
                engagementDate={Date().toString()}
                proposerVows="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                spouseVows="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                qrCodeString="Hello World"
              />
            </FlexRowWrapper>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <FlexRowWrapper>
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
            <MarriageInfoCard className="marriage-info-card" />
            <BlessedByCard
              blessings={[
                {
                  message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit offici',
                  blessedBy: 'Mom & Dad',
                  accountAddress: 'FnPXxM4KsAbakgtAkXYVSvuQ8Pmv5b5eeP3APTPM6fhd',
                  value: 15,
                },
                {
                  message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit offici',
                  blessedBy: 'Mom & Dad',
                  accountAddress: 'FnPXxM4KsAbakgtAkXYVSvuQ8Pmv5b5eeP3APTPM6fhd',
                  value: 15,
                },
              ]}
            />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </MarriageWrapper>
  );
};

export default Marriage;
