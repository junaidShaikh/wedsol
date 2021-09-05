import styled from 'styled-components/macro';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

import config from 'config';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from './common/wrappers/FlexRowWrapper';
import CopyText from './CopyText';
import BlockConfirmations from './BlockConfirmations';
import ViewOnExplorer from './ViewOnExplorer';
import SolidButton from './common/SolidButton';
import shortenWalletAddress from 'utils/shortenWalletAddress';

const MarriageInfoCardWrapper = styled.div`
  width: 100%;
  max-width: 265px;
  min-height: 283px;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 24px 16px;

  .copy-text {
    height: auto;

    ${FlexRowWrapper} {
      border-bottom: 0;
      padding-bottom: 20px;

      p {
        font-size: 14px;
        line-height: 17px;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .block-confirmations {
    margin-bottom: 14px;

    p {
      font-size: 11px;
      line-height: 13px;
      letter-spacing: 0.085em;
    }
  }

  & > ${FlexColumnWrapper} {
    border-top: 1px solid #e8e2e2;
    padding: 16px 0 24px 0;

    & > ${FlexRowWrapper} {
      &:first-of-type {
        margin-bottom: 13px;

        p {
          font-weight: 500;
          font-size: 11px;
          line-height: 13px;
          letter-spacing: 0.085em;
          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.41);
        }
      }

      &:last-of-type {
        svg {
          width: 20px;
          height: 20px;
          color: rgba(0, 0, 0, 0.45);
          margin-right: 12px;
        }

        p {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;

          color: rgba(6, 6, 6, 0.4);
        }
      }
    }
  }

  .view-on-explorer {
    height: 35px;
    text-transform: uppercase;

    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.085em;
    padding-left: 32px;

    margin-bottom: 12px;

    svg {
      width: 16px;
      height: 16px;
      left: 12px;
    }
  }

  .solid-button {
    position: relative;
    height: 35px;
    text-transform: uppercase;

    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }

    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.085em;

    padding-left: 18px;

    svg {
      width: 16px;
      height: 16px;
      color: #fff;
      position: absolute;
      left: 12px;
    }
  }

  .red {
    background: crimson;
    color: #ffffff;
    font-weight: 600;
  }
`;

interface MarriageInfoCardProps {
  className?: string;
  proposalPubKey?: string;
  showViewOnExplorer?: boolean;
  showBlessButton?: boolean;
  showFileDivorceButton?: boolean;
}

const MarriageInfoCard = ({
  className,
  proposalPubKey = '',
  showViewOnExplorer = true,
  showBlessButton = true,
  showFileDivorceButton = true,
}: MarriageInfoCardProps): JSX.Element => {
  const history = useHistory();

  return (
    <MarriageInfoCardWrapper className={clsx(className)}>
      <CopyText className="copy-text" text={window.location.href} />
      <BlockConfirmations
        className="block-confirmations"
        confirmedBlocks={Math.ceil(Math.random() * 290)}
        totalBlocks={290}
      />
      <FlexColumnWrapper>
        <FlexRowWrapper>
          <p>Contract</p>
        </FlexRowWrapper>
        <FlexRowWrapper>
          <MdContentCopy />
          <p>{shortenWalletAddress(config.programId, 10)}</p>
        </FlexRowWrapper>
      </FlexColumnWrapper>
      {showViewOnExplorer ? (
        <ViewOnExplorer
          className="view-on-explorer"
          href={`https://explorer.solana.com/address/${config.programId}?cluster=${config.solanaNetwork}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      ) : null}
      {showBlessButton ? (
        <SolidButton className="solid-button" style={{ cursor: 'not-allowed' }}>
          <FaWallet />
          Send $SOL to Bless
        </SolidButton>
      ) : null}
      {showFileDivorceButton ? (
        <SolidButton className="solid-button red" onClick={() => history.push(`/divorce/${proposalPubKey}`)}>
          <AiOutlineDelete />
          File for divorce
        </SolidButton>
      ) : null}
    </MarriageInfoCardWrapper>
  );
};

export default MarriageInfoCard;
