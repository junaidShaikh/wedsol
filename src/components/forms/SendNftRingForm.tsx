import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import NftRingPreview from 'components/NftRingPreview';
import FormInput from 'components/form-elements/FormInput';
import SolidButton from 'components/common/SolidButton';
import RingSelect from 'components/form-elements/RingSelect';

const SendNftRingFormWrapper = styled.div`
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
    h4 {
      width: 100%;
      max-width: 517px;
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

const SendNftRingForm = (): JSX.Element => {
  const history = useHistory();

  return (
    <SendNftRingFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form>
              <FormInput placeholder="Your Name" />
              <FormInput placeholder="Your potential spouses name" />
              <FormInput placeholder="Your Message" />
              <RingSelect label="Pick a ring" />
              <SolidButton onClick={() => history.push('/successful-mint')}>MINT NFT</SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <h4>Preview</h4>
            <NftRingPreview />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </SendNftRingFormWrapper>
  );
};

export default SendNftRingForm;
