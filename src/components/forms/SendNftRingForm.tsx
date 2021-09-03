import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  Transaction,
  SystemProgram,
  clusterApiUrl,
} from '@solana/web3.js';
import { Buffer } from 'buffer';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import NftRingPreview from 'components/NftRingPreview';
import FormInput from 'components/form-elements/FormInput';
import FormTextArea from 'components/form-elements/FormTextArea';
import SolidButton from 'components/common/SolidButton';
import RingSelect from 'components/form-elements/RingSelect';

import rings from 'components/common/rings';

import { getProvider } from 'utils/getProvider';
import { uploadJsonToIpfs } from 'apis/ipfs';
import config from 'config';

const NETWORK = clusterApiUrl('devnet');

const defaultValues = {
  proposerName: '',
  spouseName: '',
  message: '',
  ring: 0,
};

const validationSchema = Yup.object({
  proposerName: Yup.string().required(),
  spouseName: Yup.string().required(),
  message: Yup.string().required(),
  ring: Yup.number().positive().integer().required(),
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
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = watch(['spouseName', 'message', 'ring']);

  const history = useHistory();

  const connection = new Connection(NETWORK);

  const onSubmit = async (d: typeof defaultValues) => {
    console.log(d);
    // history.push('/successful-mint');

    // TODO Upload JSON to IPFS and get IPFS CID
    const { data } = await uploadJsonToIpfs({ ...d, ring: rings[d.ring] });

    if (data) {
      console.log(data);
    }

    const provider = getProvider();

    if (!provider?.publicKey) return;

    const programIdPublicKey = new PublicKey(config.programId);

    const programPubKey = await PublicKey.createWithSeed(provider.publicKey as PublicKey, 'hello', programIdPublicKey);
    const lamports = await connection.getMinimumBalanceForRentExemption(5 * 1024 * 1024);
    let transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: provider.publicKey,
        basePubkey: provider.publicKey,
        seed: 'hello',
        newAccountPubkey: programPubKey,
        lamports,
        space: 5 * 1024 * 1024,
        programId: programIdPublicKey,
      })
    );
    transaction.feePayer = provider.publicKey;
    console.log('Getting recent blockhash');
    (transaction as any).recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    if (transaction) {
      try {
        let signed = await provider.signTransaction(transaction);
        console.log('Got signature, submitting transaction');
        let signature = await connection.sendRawTransaction(signed.serialize());
        console.log('Submitted transaction ' + signature + ', awaiting confirmation');
        await connection.confirmTransaction(signature);
        console.log('Transaction ' + signature + ' confirmed');
      } catch (err: any) {
        console.warn(err);
        if (err?.code === 4001 && err?.message === 'User rejected the request.') {
          alert(err.message);
        }
      }
    }

    const proposalData = Buffer.alloc(64);
    proposalData[0] = 0;
    proposalData.fill(data.cid, 1);

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
      data: proposalData,
    });
    transaction = new Transaction().add(instruction);
    transaction.feePayer = provider.publicKey;
    console.log('Getting recent blockhash');
    (transaction as any).recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    if (transaction) {
      try {
        let signed = await provider.signTransaction(transaction);
        console.log('Got signature, submitting transaction');
        let signature = await connection.sendRawTransaction(signed.serialize());
        console.log('Submitted transaction ' + signature + ', awaiting confirmation');
        await connection.confirmTransaction(signature);
        console.log('Transaction ' + signature + ' confirmed');
        history.push('/successful-mint');
      } catch (err: any) {
        console.warn(err);
        if (err?.code === 4001 && err?.message === 'User rejected the request.') {
          alert(err.message);
        }
      }
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
              <RingSelect label="Pick a ring" onChange={(value) => setValue('ring', value)} />
              <SolidButton type="submit">MINT NFT</SolidButton>
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
