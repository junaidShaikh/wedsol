import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import AcceptingRingPreview from 'components/AcceptingRingPreview';
import SolidButton from 'components/common/SolidButton';
import RingSelect from 'components/form-elements/RingSelect';

const defaultValues = {
  ring: 0,
};

const validationSchema = Yup.object({
  ring: Yup.number().positive().integer().required(),
}).required();

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
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = watch(['ring']);

  const history = useHistory();

  const onSubmit = (d: any) => {
    console.log(d);
    history.push('/successful-mint');
  };

  return (
    <AcceptingRingFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>
                Choose a Ring for <span>{proposerName}</span>
              </h2>
              <Controller
                control={control}
                name="ring"
                render={() => <RingSelect label="Pick a ring" onChange={(value) => setValue('ring', value)} />}
              />
              <SolidButton onClick={() => history.push('/engagement')}>MINT AND ACCEPT</SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <h4>Preview</h4>
            <AcceptingRingPreview
              proposerName={proposerName}
              spouseName={spouseName}
              ring1={0}
              ring2={formValues[0]}
              qrCodeString="Hello World"
            />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </AcceptingRingFormWrapper>
  );
};

export default AcceptingRingForm;
