import styled from 'styled-components/macro';

import { useHistory } from 'react-router-dom';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import SolidButton from 'components/common/SolidButton';
import ProposalLink from 'components/ProposalLink';
import SignerCard from 'components/SignerCard';
import AssetCardMini from 'components/AssetCardMini';

const DivorceFormWrapper = styled.div`
  width: 100%;
  height: auto;

  & > ${Container} > ${FlexRowWrapper} > ${FlexColumnWrapper} {
    align-items: center;
    justify-content: flex-start;

    &:first-of-type {
      border-right: 1px solid #eaeaea;
    }
  }

  & > ${Container} > ${FlexRowWrapper} > .col-1 {
    form {
      margin-top: 24px;
      width: 100%;
      max-width: 526px;

      label {
        display: block;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        color: rgba(6, 6, 6, 0.4);
        margin-bottom: 32px;
      }

      .asset-card {
        margin-bottom: 32px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }

      button {
        margin-top: 45px;
        background: #f36a71;
      }
    }
  }

  & > ${Container} > ${FlexRowWrapper} > .col-2 {
    ${Container} {
      width: 100%;
      max-width: 517px;
    }

    h4 {
      width: 100%;
      margin-top: 24px;
      margin-bottom: 21px;

      font-weight: 500;
      font-size: 19px;
      line-height: 23px;
      letter-spacing: 0.085em;
      text-transform: uppercase;

      color: rgba(0, 0, 0, 0.41);
    }
  }
`;

const DivorceForm = (): JSX.Element => {
  const history = useHistory();

  return (
    <DivorceFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form>
              <label>After Divorce</label>
              <AssetCardMini
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCardMini
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCardMini
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />

              <SolidButton onClick={() => history.push('/')}>SIGN AND DIVORCE</SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <Container>
              <ProposalLink link="app.wedsol.com/proposal/1" />
              <h4>Signed By</h4>
              <SignerCard
                signerName="Rahul Kumar"
                signerAccountAddress="FnPXxM4KsAbakgtAkXYVSvuQ8Pmv5b5eeP3APTPM6fhd"
              />
              <h4>Waiting For</h4>
              <SignerCard
                signerName="Priyanka Bedi"
                signerAccountAddress="FnPXxM4KsAbakgtAkXYVSvuQ8Pmv5b5eeP3APTPM6fhd"
              />
            </Container>
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </DivorceFormWrapper>
  );
};

export default DivorceForm;
