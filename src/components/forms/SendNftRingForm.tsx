import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PublicKey, TransactionInstruction, Transaction, SystemProgram } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { useSnapshot } from 'valtio';

import { state } from 'state';

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
  proposerRing: Yup.number().positive().integer().required(),
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

  const snap = useSnapshot(state);

  const onSubmit = async (d: typeof defaultValues) => {
    try {
      setIsSubmitting(true);
      console.log(d);

      // Upload JSON to IPFS and get IPFS CID
      const { data } = await uploadJsonToIpfs({ ...d, proposerRing: rings[d.proposerRing] });

      if (data) {
        console.log(data);

        const provider = getProvider();

        if (!provider?.publicKey) return;

        const programIdPublicKey = new PublicKey(config.programId);

        const programPubKey = await PublicKey.createWithSeed(
          provider.publicKey as PublicKey,
          'hello',
          programIdPublicKey
        );
        const lamports = await snap.connection.getMinimumBalanceForRentExemption(15 * 1024);
        let transaction = new Transaction().add(
          SystemProgram.createAccountWithSeed({
            fromPubkey: provider.publicKey,
            basePubkey: provider.publicKey,
            seed: 'hello',
            newAccountPubkey: programPubKey,
            lamports,
            space: 15 * 1024,
            programId: programIdPublicKey,
          })
        );
        transaction.feePayer = provider.publicKey;
        console.log('Getting recent blockhash');
        (transaction as any).recentBlockhash = (await snap.connection.getRecentBlockhash()).blockhash;
        if (transaction) {
          let signed = await provider.signTransaction(transaction);
          console.log('Got signature, submitting transaction');
          let signature = await snap.connection.sendRawTransaction(signed.serialize());
          console.log('Submitted transaction ' + signature + ', awaiting confirmation');
          await snap.connection.confirmTransaction(signature);
          console.log('Transaction ' + signature + ' confirmed');
        }

        let proposalData = '';
        proposalData += '\x04';
        proposalData += data.cid;

        const instruction = new TransactionInstruction({
          keys: [
            {
              pubkey: provider.publicKey as PublicKey,
              isSigner: true,
              isWritable: false,
            },
            {
              pubkey: programPubKey,
              isSigner: false,
              isWritable: true,
            },
          ],
          programId: programIdPublicKey,
          data: Buffer.from(proposalData, 'utf-8'),
        });
        transaction = new Transaction().add(instruction);
        transaction.feePayer = provider.publicKey;
        console.log('Getting recent blockhash');
        (transaction as any).recentBlockhash = (await snap.connection.getRecentBlockhash()).blockhash;
        if (transaction) {
          let signed = await provider.signTransaction(transaction);
          console.log('Got signature, submitting transaction');
          let signature = await snap.connection.sendRawTransaction(signed.serialize());
          console.log('Submitted transaction ' + signature + ', awaiting confirmation');
          await snap.connection.confirmTransaction(signature);
          console.log('Transaction ' + signature + ' confirmed');
          history.push({
            pathname: `/proposal/${programPubKey.toBase58()}/created`,
            state: {
              proposalTransaction: signature,
              spouseName: d.spouseName,
              message: d.message,
              proposerRing: d.proposerRing,
            },
          });
        }
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
