import styled from 'styled-components/macro';
import clsx from 'clsx';
import { FiMoreVertical } from 'react-icons/fi';
import { MdContentCopy } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

import { useClipboard } from 'use-clipboard-copy';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';

const AssetCardWrapper = styled.div`
  width: 827px;
  height: 130px;

  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 4px 18px -4px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 24px 28px;
  position: relative;

  .more {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 18px;
    right: 18px;
    cursor: pointer;
  }

  .asset-card-grid {
    display: grid;
    grid-template-columns: 1.2fr 3fr 1.5fr 1.5fr 1.8fr;

    ${FlexColumnWrapper} {
      padding-top: 8px;
    }

    img {
      width: 79px;
      height: 79px;

      background: #edeeef;
      object-fit: cover;
    }

    .asset-name {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;

      color: #000000;
      margin-bottom: 8px;
    }

    .asset-description {
      font-size: 18px;
      line-height: 22px;

      color: rgba(0, 0, 0, 0.58);
    }

    label {
      display: block;
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      letter-spacing: 0.085em;

      color: rgba(0, 0, 0, 0.41);
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .value {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;

      color: #000000;
    }

    .approved-pill {
      width: 137px;
      height: 29px;

      background: rgba(138, 182, 188, 0.21);
      border-radius: 31px;

      display: grid;
      place-items: center;
      margin-bottom: 16px;

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;

        color: rgba(0, 0, 0, 0.67);
      }
    }

    .view-terms {
      width: 137px;
      display: flex;
      align-items: center;

      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;
        margin-right: 12px;
      }

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
        text-transform: capitalize;
      }
    }
  }
`;

interface AssetCardProps {
  className?: string;
  assetIpfsCid: string;
  proposalPubKey: string;
  assetImage?: string;
  assetName: string;
  assetDescription: string;
  assetValue: string;
  assetOwnershipPercentage: string;
}

const AssetCard = ({
  className,
  assetIpfsCid,
  proposalPubKey,
  assetImage = '',
  assetName,
  assetDescription,
  assetValue,
  assetOwnershipPercentage,
}: AssetCardProps): JSX.Element => {
  const clipboard = useClipboard({
    copiedTimeout: 2000, // timeout duration in milliseconds
  });

  return (
    <AssetCardWrapper className={clsx(className)}>
      <FiMoreVertical className="more" />
      <div className="asset-card-grid">
        <img src={assetImage} alt="" />
        <FlexColumnWrapper>
          <p className="asset-name">{assetName}</p>
          <p className="asset-description">{assetDescription}</p>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <label>Value</label>
          <h2 className="value">{assetValue}</h2>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <label>Ownership</label>
          <h2 className="value">{assetOwnershipPercentage}</h2>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <div className="approved-pill">
            <p>Approved</p>
          </div>
          <div
            className="view-terms"
            onClick={() => {
              clipboard.copy(`${window.location.origin}/approve-asset/${proposalPubKey}/${assetIpfsCid}`);
            }}
          >
            {clipboard.copied ? <FaCheckCircle style={{ color: 'green' }} /> : <MdContentCopy />}
            <p>Approval Link</p>
          </div>
        </FlexColumnWrapper>
      </div>
    </AssetCardWrapper>
  );
};

export default AssetCard;
