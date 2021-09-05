import * as React from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, Link } from 'react-router-dom';
import { IoLink, IoLogoTwitter, IoLogoFacebook } from 'react-icons/io5';
import { HiExternalLink } from 'react-icons/hi';
import { useSnapshot } from 'valtio';
import { PublicKey } from '@solana/web3.js';

import {
  state,
  setProposalInfoLoading,
  setProposalInfoData,
  setProposalInfoFailure,
  setProposalInfoError,
} from 'state';

import Container from 'components/common/wrappers/Container';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import SectionTitle from 'components/common/SectionTitle';
import MarriageCertificate from 'components/MarriageCertificate';
import BlessedByCard from 'components/BlessedByCard';
import MarriageInfoCard from 'components/MarriageInfoCard';
import FullPageSpinner from 'components/common/FullPageSpinner';

import getAccountInfo from 'utils/getAccountInfo';
import getActualSigners from 'utils/getActualSigners';
import { fetchIpfsJsonData } from 'apis/ipfs';
import ConnectWalletButton from 'components/ConnectWalletButton';

const MarriageWrapper = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 80px 0 160px 0;

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

        display: flex;
        align-items: center;

        a {
          text-decoration: none;
          color: inherit;
        }
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
  const snap = useSnapshot(state);

  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();
  const history = useHistory();

  React.useEffect(() => {
    try {
      if (!proposalPubKey) {
        history.replace('/');
      }

      (async () => {
        setProposalInfoLoading();
        const accountInfo = await getAccountInfo(new PublicKey(proposalPubKey));
        const { data } = await fetchIpfsJsonData(accountInfo?.extra?.substr(0, 46));
        console.log(data);
        if (data) {
          setProposalInfoData({
            ...data,
            signers: getActualSigners([accountInfo.partner1, accountInfo.partner2]),
          });
        } else {
          setProposalInfoFailure();
        }
      })();
    } catch (error) {
      console.log(error);
      setProposalInfoError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (snap.proposalInfo.isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <MarriageWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <FlexRowWrapper>
              <SectionTitle className="section-title">Blockchain Wedding</SectionTitle>
              {/* <p>#2343343</p> */}
              {snap.isWalletConnected ? (
                <p>
                  <Link to="/assets">View Assets</Link>&nbsp;&nbsp;
                  <HiExternalLink />
                </p>
              ) : (
                <ConnectWalletButton />
              )}
            </FlexRowWrapper>
            <FlexRowWrapper>
              <MarriageCertificate
                proposerName={snap.proposalInfo.data?.proposerName ?? ''}
                spouseName={snap.proposalInfo.data?.spouseName ?? ''}
                engagementDate={snap.proposalInfo.data?.marriageDate ?? Date().toString()}
                proposerVows={snap.proposalInfo.data?.proposerVows ?? ''}
                spouseVows={snap.proposalInfo.data?.spouseVows ?? ''}
                qrCodeString={window.location.href}
              />
            </FlexRowWrapper>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <FlexRowWrapper>
              <a href={window.location.href} target="_blank" rel="noopener noreferrer">
                <IoLink />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <IoLogoTwitter />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <IoLogoFacebook />
              </a>
            </FlexRowWrapper>
            <MarriageInfoCard
              className="marriage-info-card"
              proposalPubKey={proposalPubKey}
              showViewOnExplorer={true}
              showBlessButton={true}
              showFileDivorceButton={true}
            />
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
