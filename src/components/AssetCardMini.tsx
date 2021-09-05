import styled from 'styled-components/macro';
import clsx from 'clsx';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';

const AssetCardMiniWrapper = styled.div`
  width: 100%;
  max-width: 526px;
  min-height: 121px;

  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 4px 18px -4px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 28px;

  .card-grid {
    display: grid;
    grid-template-columns: 1.6fr 4fr 1.8fr 1.8fr;

    img {
      width: 62px;
      height: 62px;
      background: #edeeef;
    }

    h2 {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;

      color: #000000;
    }

    h3 {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;

      color: #000000;
      margin-bottom: 8px;
    }

    h5 {
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      letter-spacing: 0.085em;
      text-transform: uppercase;

      color: rgba(0, 0, 0, 0.41);
      margin-bottom: 12px;
    }

    p {
      font-size: 14px;
      line-height: 17px;

      color: rgba(0, 0, 0, 0.58);
    }
  }
`;

interface AssetCardMiniProps {
  className?: string;
  assetImage?: string;
  assetName: string;
  assetDescription: string;
  assetValue: string | number;
  assetOwnershipPercentage: string;
}

const AssetCardMini = ({
  className,
  assetImage = '',
  assetName,
  assetDescription,
  assetValue,
  assetOwnershipPercentage,
}: AssetCardMiniProps): JSX.Element => {
  return (
    <AssetCardMiniWrapper className={clsx(className)}>
      <div className="card-grid">
        <img src={assetImage} alt="" />
        <FlexColumnWrapper>
          <h3>{assetName}</h3>
          <p>{assetDescription}</p>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <h5>Value</h5>
          <h2>{assetValue}</h2>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <h5>Ownership</h5>
          <h2>{assetOwnershipPercentage}</h2>
        </FlexColumnWrapper>
      </div>
    </AssetCardMiniWrapper>
  );
};

export default AssetCardMini;
