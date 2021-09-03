import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FormInput from 'components/form-elements/FormInput';
import FormTextArea from 'components/form-elements/FormTextArea';
import SolidButton from 'components/common/SolidButton';
import AddImages from 'components/form-elements/AddImages';
import ProposalLink from 'components/ProposalLink';
import SignerCard from 'components/SignerCard';

const defaultValues = {
  assetName: '',
  assetDescription: '',
  assetValue: '',
  assetTerms: '',
  percentageSplit: '',
  percentageIncaseOfDivorce: '',
};

const validationSchema = Yup.object({
  assetName: Yup.string().required(),
  assetDescription: Yup.string().required(),
  assetValue: Yup.number().positive().integer().required(),
  assetTerms: Yup.string().required(),
  percentageSplit: Yup.string().required(),
  percentageIncaseOfDivorce: Yup.string().required(),
}).required();

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

      .add-images {
        margin-bottom: 32px;
      }

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
  const { register, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const history = useHistory();

  const onSubmit = (d: any) => {
    console.log(d);
    history.push('/approve-asset');
  };

  return (
    <AddAssetFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AddImages label="Add Images" className="add-images" />
              <FormInput placeholder="Asset Name" {...register('assetName')} />
              <FormTextArea placeholder="Asset Description" {...register('assetDescription')} />
              <FormInput type="number" placeholder="Asset Value" {...register('assetValue')} />
              <FormTextArea placeholder="Asset Terms" {...register('assetTerms')} />
              <FormInput
                type="number"
                min={0}
                max={100}
                placeholder="Percentage Split"
                {...register('percentageSplit')}
              />
              <FormInput
                type="number"
                min={0}
                max={100}
                placeholder="Percentage Incase of Divorce"
                {...register('percentageIncaseOfDivorce')}
              />
              <SolidButton type="submit">SIGN ASSET</SolidButton>
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
