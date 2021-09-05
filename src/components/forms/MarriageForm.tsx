import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { format } from 'date-fns';

import { PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import MarriagePreview from 'components/MarriagePreview';
import FormInput from 'components/form-elements/FormInput';
import FormTextArea from 'components/form-elements/FormTextArea';
import SolidButton from 'components/common/SolidButton';
import Spinner from 'components/common/Spinner';

import { getProvider } from 'utils/getProvider';
import { uploadJsonToIpfs } from 'apis/ipfs';
import config from 'config';
import getConnection from 'utils/getConnection';
import getPubKeyFromSeed from 'utils/getPubKeyFromSeed';
import marriageData from 'utils/marriageData';

const defaultValues = {
  marriageDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  proposerName: '',
  spouseName: '',
  proposerVows: '',
  spouseVows: '',
};

const validationSchema = Yup.object({
  marriageDate: Yup.string().required(),
  proposerName: Yup.string().required(),
  spouseName: Yup.string().required(),
  proposerVows: Yup.string().required(),
  spouseVows: Yup.string().required(),
}).required();

const MarriageFormWrapper = styled.div`
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

const MarriageForm = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, watch, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = watch();

  const history = useHistory();

  const connection = getConnection();

  const onSubmit = async (d: typeof defaultValues) => {
    try {
      setIsSubmitting(true);
      console.log(d);

      const provider = getProvider();
      if (!provider?.publicKey) return;

      const programIdPublicKey = new PublicKey(config.programId);

      const proposalPubKey = await getPubKeyFromSeed();

      // Upload JSON to IPFS and get IPFS CID
      const { data } = await uploadJsonToIpfs(defaultValues);

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
        data: marriageData(),
      });
      const transaction = new Transaction().add(instruction);
      transaction.feePayer = provider.publicKey;
      (transaction as any).recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      if (transaction) {
        let signed = await provider.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        history.push({
          pathname: `/marriage/${proposalPubKey}`,
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
    <MarriageFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput type="datetime-local" placeholder="Pick a date" {...register('marriageDate')} />
              <FlexRowWrapper>
                <FormInput placeholder="Your name" style={{ marginRight: 10 }} {...register('proposerName')} />
                <FormInput placeholder="Your spouse's name" style={{ marginLeft: 10 }} {...register('spouseName')} />
              </FlexRowWrapper>
              <FormTextArea placeholder="Your vows" {...register('proposerVows')} />
              <FormTextArea placeholder="Your spouse's vows" {...register('spouseVows')} />
              <SolidButton type="submit" className="solid-button">
                {isSubmitting && <Spinner className="spinner" />}
                {isSubmitting ? 'Creating...' : 'CREATE CONTRACT'}
              </SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <h4>Preview</h4>
            <MarriagePreview
              proposerName={formValues.proposerName}
              spouseName={formValues.spouseName}
              engagementDate={formValues.marriageDate}
              proposerVows={formValues.proposerVows}
              spouseVows={formValues.spouseVows}
              qrCodeString="Hello World"
            />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </MarriageFormWrapper>
  );
};

export default MarriageForm;
