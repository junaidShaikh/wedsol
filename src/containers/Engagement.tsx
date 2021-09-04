import * as React from 'react';
import styled from 'styled-components/macro';
import { PublicKey } from '@solana/web3.js';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import { Buffer } from 'buffer';
import { IoLink, IoLogoTwitter, IoLogoFacebook } from 'react-icons/io5';

import config from 'config';
import { state } from 'state';

import Container from 'components/common/wrappers/Container';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import EngagementCard from 'components/EngagementCard';
import FullPageSpinner from 'components/common/FullPageSpinner';

import rings from 'components/common/rings';

import shortenWalletAddress from 'utils/shortenWalletAddress';
import getConnection from 'utils/getConnection';

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

  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();
  const history = useHistory();

  const connection = getConnection();

  React.useEffect(() => {
    try {
      if (!proposalPubKey) {
        return history.replace('/');
      }

      (async () => {
        if (!state.proposalInfo.data) {
          state.proposalInfo.isLoading = true;
          const programPubKey = new PublicKey(proposalPubKey);
          const accountInfo = await connection.getAccountInfo(programPubKey);
          if (accountInfo === null) {
            throw new Error('Error: cannot find the greeted account');
          } else {
            const endPost = accountInfo.data.indexOf(0);
            const result = JSON.parse(accountInfo.data.slice(0, endPost).toString());

            console.log(result);

            const { data } = await axios.get(`${config.ipfsGatewayBaseUrl}${result?.info?.substr(0, 46)}`);

            if (data) {
              state.proposalInfo.isLoading = false;
              state.proposalInfo.isSuccess = true;
              state.proposalInfo.data = {
                ...data,
                signers: [
                  !result.partner1.every((value: number) => value === 0)
                    ? shortenWalletAddress(new PublicKey(Buffer.from(result.partner1)).toBase58(), 5)
                    : null,
                  !result.partner2.every((value: number) => value === 0)
                    ? shortenWalletAddress(new PublicKey(Buffer.from(result.partner2)).toBase58(), 5)
                    : null,
                ],
              };
            } else {
              state.proposalInfo.isLoading = false;
              state.proposalInfo.isSuccess = false;
            }
          }
        }
      })();
    } catch (error) {
      console.log(error);
      state.proposalInfo.isLoading = false;
      state.proposalInfo.isSuccess = false;
      state.proposalInfo.error = error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (snap.proposalInfo.isLoading) {
    return <FullPageSpinner />;
  }

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
