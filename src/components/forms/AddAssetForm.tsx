import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import { useSnapshot } from 'valtio';

import { state } from 'state';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FormInput from 'components/form-elements/FormInput';
import FormTextArea from 'components/form-elements/FormTextArea';
import SolidButton from 'components/common/SolidButton';
import AddImages from 'components/form-elements/AddImages';
import ProposalLink from 'components/ProposalLink';
import SignerCard from 'components/SignerCard';
import Spinner from 'components/common/Spinner';

import { getProvider } from 'utils/getProvider';
import { uploadJsonToIpfs } from 'apis/ipfs';
import config from 'config';
import getConnection from 'utils/getConnection';
import getPubKeyFromSeed from 'utils/getPubKeyFromSeed';
import addAssetData from 'utils/addAssetData';

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

      button.solid-button {
        margin-top: 45px;
        position: relative;

        display: grid;
        place-items: center;

        .spinner {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 15px;
        }
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

    .signer-card {
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const AddAssetForm = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [percentageSplit, percentageIncaseOfDivorce] = watch(['percentageSplit', 'percentageIncaseOfDivorce']);

  const history = useHistory();

  const snap = useSnapshot(state);

  const connection = getConnection();

  const onSubmit = async (d: typeof defaultValues) => {
    try {
      setIsSubmitting(true);

      const provider = getProvider();

      if (!provider?.publicKey) return;

      const programIdPublicKey = new PublicKey(config.programId);

      const proposalPubKey = await getPubKeyFromSeed();

      // Upload JSON to IPFS and get IPFS CID
      const { data } = await uploadJsonToIpfs({ ...defaultValues });

      if (!data) {
        throw new Error('IPFS CID was not received!');
      }

      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: provider.publicKey as PublicKey,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: proposalPubKey,
            isSigner: false,
            isWritable: true,
          },
        ],
        programId: programIdPublicKey,
        data: addAssetData(data.cid),
      });
      const transaction = new Transaction().add(instruction);
      transaction.feePayer = provider.publicKey;
      (transaction as any).recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      if (transaction) {
        let signed = await provider.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        history.push({
          pathname: `/assets`,
        });
      }
    } catch (error: any) {
      console.warn(error);
      if (error?.code === 4001 && error?.message === 'User rejected the request.') {
        alert(error?.message);
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <SolidButton type="submit" className="solid-button">
                {isSubmitting && <Spinner className="spinner" />}
                {isSubmitting ? 'Signing...' : 'SIGN ASSET'}
              </SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <Container>
              <ProposalLink link={window.location.href} />
              <h4>Signed By</h4>
              <h4>Waiting For</h4>
              <SignerCard
                className="signer-card"
                signerName={snap.proposalInfo.data?.proposerName ?? ''}
                signerAccountAddress={snap.proposalInfo.data?.signers[0] ?? ''}
              />
              <SignerCard
                className="signer-card"
                signerName={snap.proposalInfo.data?.spouseName ?? ''}
                signerAccountAddress={snap.proposalInfo.data?.signers[1] ?? ''}
              />
            </Container>
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </AddAssetFormWrapper>
  );
};

export default AddAssetForm;
