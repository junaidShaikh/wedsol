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
  images: [] as string[],
  assetName: '',
  assetDescription: '',
  assetValue: '',
  assetTerms: '',
  percentageSplit: null,
  percentageIncaseOfDivorce: null,
};

const validationSchema = Yup.object({
  images: Yup.array().of(Yup.string()).min(0).max(5).required(),
  assetName: Yup.string().required(),
  assetDescription: Yup.string().required(),
  assetValue: Yup.number().positive().integer().required(),
  assetTerms: Yup.string().required(),
  percentageSplit: Yup.number().positive().integer().min(0).max(100).required(),
  percentageIncaseOfDivorce: Yup.number().positive().integer().min(0).max(100).required(),
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

      .percentage-input-wrapper {
        position: relative;

        p {
          position: absolute;
          top: 50%;
          right: 32px;
          transform: translateY(-80%);

          font-weight: 500;
          font-size: 18px;
          line-height: 22px;

          color: #000000;
        }
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
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [percentageSplit, percentageIncaseOfDivorce] = watch(['percentageSplit', 'percentageIncaseOfDivorce']);

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
              <AddImages
                label="Add Images"
                className="add-images"
                onNewImage={(imageUrls: string[]) => setValue('images', imageUrls)}
              />
              <FormInput placeholder="Asset Name" {...register('assetName')} />
              <FormTextArea placeholder="Asset Description" {...register('assetDescription')} />
              <FormInput type="number" placeholder="Asset Value" {...register('assetValue')} />
              <FormTextArea placeholder="Asset Terms" {...register('assetTerms')} />
              <FlexRowWrapper className="percentage-input-wrapper">
                <FormInput
                  type="number"
                  step={1}
                  min={0}
                  max={100}
                  placeholder="Percentage Split"
                  {...register('percentageSplit')}
                />
                {percentageSplit ? (
                  <p>
                    {percentageSplit}% : {100 - percentageSplit}%
                  </p>
                ) : null}
              </FlexRowWrapper>
              <FlexRowWrapper className="percentage-input-wrapper">
                <FormInput
                  type="number"
                  step={1}
                  min={0}
                  max={100}
                  placeholder="Percentage Incase of Divorce"
                  {...register('percentageIncaseOfDivorce')}
                />
                {percentageIncaseOfDivorce ? (
                  <p>
                    {percentageIncaseOfDivorce}% : {100 - percentageIncaseOfDivorce}%
                  </p>
                ) : null}
              </FlexRowWrapper>
              <SolidButton type="submit">SIGN ASSET</SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <Container>
              <ProposalLink link="app.chainwed.com/proposal/1" />
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
