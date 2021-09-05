import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PublicKey, TransactionInstruction, Transaction, SystemProgram } from '@solana/web3.js';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import NftRingPreview from 'components/NftRingPreview';
import FormInput from 'components/form-elements/FormInput';
import FormTextArea from 'components/form-elements/FormTextArea';
import SolidButton from 'components/common/SolidButton';
import RingSelect from 'components/form-elements/RingSelect';
import Spinner from 'components/common/Spinner';

import rings from 'components/common/rings';

import { getProvider } from 'utils/getProvider';
import { uploadJsonToIpfs } from 'apis/ipfs';
import config from 'config';
import getConnection from 'utils/getConnection';
import getPubKeyFromSeed from 'utils/getPubKeyFromSeed';
import proposalData from 'utils/proposalData';
import extraData from 'utils/extraData';

const defaultValues = {
  proposerName: '',
  spouseName: '',
  message: '',
  proposerRing: 0,
};

const validationSchema = Yup.object({
  proposerName: Yup.string().required(),
  spouseName: Yup.string().required(),
  message: Yup.string().required(),
  proposerRing: Yup.number().required(),
}).required();

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

const SendNftRingForm = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = watch(['spouseName', 'message', 'proposerRing']);

  const history = useHistory();

  const connection = getConnection();

  const onSubmit = async (d: typeof defaultValues) => {
    try {
      setIsSubmitting(true);

      /**
       * Upload JSON to IPFS and get IPFS CID
       */
      const { data } = await uploadJsonToIpfs({ ...d, proposerRing: rings[d.proposerRing] });

      if (!data) {
        throw new Error('IPFS CID not received!');
      }

      const provider = getProvider();
      if (!provider?.publicKey) return;

      const programIdPublicKey = new PublicKey(config.programId);

      /**
       * Get Seed Derived Public Key. Unique for each wallet address. Seed phrase and program id remain constant.
       */
      const proposalPubKey = await getPubKeyFromSeed();

      /**
       * Create new account using this pub key and seed on the blockchain.
       */
      const lamports = await connection.getMinimumBalanceForRentExemption(15 * 1024);

      const instruction1 = SystemProgram.createAccountWithSeed({
        fromPubkey: provider.publicKey,
        basePubkey: provider.publicKey,
        seed: 'hello',
        newAccountPubkey: proposalPubKey,
        lamports,
        space: 15 * 1024,
        programId: programIdPublicKey,
      });

      const instruction2 = new TransactionInstruction({
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
        data: proposalData(data.cid),
      });

      const instruction3 = new TransactionInstruction({
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
        data: extraData(data.cid),
      });

      const transaction = new Transaction().add(instruction1, instruction2, instruction3);
      transaction.feePayer = provider.publicKey;
      (transaction as any).recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      if (transaction) {
        let signed = await provider.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        history.push({
          pathname: `/proposal/${proposalPubKey.toBase58()}/created`,
          state: {
            proposalTransaction: signature,
            spouseName: d.spouseName,
            message: d.message,
            proposerRing: d.proposerRing,
          },
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
    <SendNftRingFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput placeholder="Your Name" {...register('proposerName')} />
              <FormInput placeholder="Your potential spouses name" {...register('spouseName')} />
              <FormTextArea placeholder="Your Message" {...register('message')} />
              <RingSelect label="Pick a ring" onChange={(value) => setValue('proposerRing', value)} />
              <SolidButton type="submit" className="solid-button">
                {isSubmitting && <Spinner className="spinner" />}
                {isSubmitting ? 'Minting...' : 'MINT NFT'}
              </SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <h4>Preview</h4>
            <NftRingPreview spouseName={formValues[0]} message={formValues[1]} ring={formValues[2]} />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </SendNftRingFormWrapper>
  );
};

export default SendNftRingForm;
