import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FormInput from 'components/form-elements/FormInput';
import SolidButton from 'components/common/SolidButton';
import AddImages from 'components/form-elements/AddImages';
import ProposalLink from 'components/ProposalLink';
import SignerCard from 'components/SignerCard';

const AddAssetFormWrapper = styled.div`
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
      max-width: 455px;

      button {
        margin-top: 45px;
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

const AddAssetForm = (): JSX.Element => {
  const history = useHistory();

  return (
    <AddAssetFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form>
              <AddImages label="Add Images" />
              <FormInput placeholder="Asset Name" />
              <FormInput placeholder="Asset Description" />
              <FormInput placeholder="Asset Value" />
              <FormInput placeholder="Asset Terms" />
              <FormInput placeholder="Percentage Split" />
              <FormInput placeholder="Incase of Divorce" />
              <SolidButton onClick={() => history.push('/approve-asset')}>SIGN ASSET</SolidButton>
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
    </AddAssetFormWrapper>
  );
};

export default AddAssetForm;
