import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import Container from 'components/common/wrappers/Container';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import MarriageInfoCard from 'components/MarriageInfoCard';
import SolidButton from 'components/common/SolidButton';
import AssetCard from 'components/AssetCard';

const AssetsWrapper = styled.main`
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
    ${FlexRowWrapper} {
      align-items: center;
      margin-bottom: 44px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .my-assets {
      font-family: var(--pt-serif);
      font-weight: normal;
      font-size: 30px;
      line-height: 40px;
      margin-right: 24px;

      color: #000000;
    }

    .add-asset {
      width: 148px;
      height: 34px;

      background: #292735;
      border-radius: 54px;
      position: relative;

      display: grid;
      place-items: center;
      padding-left: 12px;

      svg {
        position: absolute;
        width: 16px;
        height: 16px;
        left: 12px;
      }
    }

    .asset-card {
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  & > ${Container} > ${FlexRowWrapper} > .col-2 {
    p.current-contract {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;

      color: rgba(0, 0, 0, 0.51);
      margin-bottom: 24px;
      text-transform: uppercase;
    }

    .marriage-info-card {
      margin-bottom: 24px;
    }
  }
`;

const Assets = (): JSX.Element => {
  const history = useHistory();

  return (
    <AssetsWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <FlexRowWrapper>
              <h1 className="my-assets">My Assets</h1>
              <SolidButton className="add-asset" onClick={() => history.push('/add-asset')}>
                <FaPlus />
                Add Asset
              </SolidButton>
            </FlexRowWrapper>
            <FlexColumnWrapper>
              <AssetCard
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCard
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCard
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCard
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
            </FlexColumnWrapper>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <p className="current-contract">Current Contract</p>
            <MarriageInfoCard className="marriage-info-card" showBlessButton={false} showFileDivorceButton={true} />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </AssetsWrapper>
  );
};

export default Assets;
