import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import AcceptingRingPreview from 'components/AcceptingRingPreview';
import SolidButton from 'components/common/SolidButton';
import RingSelect from 'components/form-elements/RingSelect';

import previewRing1 from 'assets/images/preview-ring-1.png';
import previewRing2 from 'assets/images/preview-ring-2.png';

const AcceptingRingFormWrapper = styled.div`
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

      h2 {
        font-family: var(--pt-serif);
        font-weight: normal;
        font-size: 36px;
        line-height: 48px;

        color: rgba(0, 0, 0, 0.38);
        margin-bottom: 38px;

        span {
          text-transform: capitalize;
        }
      }

      button {
        margin-top: 175px;
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

interface AcceptingRingFormProps {
  proposerName: string;
  spouseName: string;
  qrCodeString: string;
}

const AcceptingRingForm = ({ proposerName, spouseName, qrCodeString }: AcceptingRingFormProps): JSX.Element => {
  const history = useHistory();
  return (
    <AcceptingRingFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form>
              <h2>
                Choose a Ring for <span>{proposerName}</span>
              </h2>
              <RingSelect label="Pick a ring" />
              <SolidButton onClick={() => history.push('/engagement')}>MINT AND ACCEPT</SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <h4>Preview</h4>
            <AcceptingRingPreview
              proposerName={proposerName}
              spouseName={spouseName}
              ring1={previewRing1}
              ring2={previewRing2}
              qrCodeString="Hello World"
            />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </AcceptingRingFormWrapper>
  );
};

export default AcceptingRingForm;
