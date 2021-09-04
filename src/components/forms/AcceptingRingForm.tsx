import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { useSnapshot } from 'valtio';

import { state } from 'state';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import AcceptingRingPreview from 'components/AcceptingRingPreview';
import SolidButton from 'components/common/SolidButton';
import RingSelect from 'components/form-elements/RingSelect';
import Spinner from 'components/common/Spinner';

import rings from 'components/common/rings';

import { getProvider } from 'utils/getProvider';
import { uploadJsonToIpfs } from 'apis/ipfs';
import config from 'config';

const defaultValues = {
  spouseRing: 0,
};

const validationSchema = Yup.object({
  spouseRing: Yup.number().required(),
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

      button.solid-button {
        margin-top: 175px;
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

interface AcceptingRingFormProps {
  proposerName: string;
  spouseName: string;
  proposerRing: string;
  qrCodeString: string;
}

const AcceptingRingForm = ({
  proposerName,
  spouseName,
  proposerRing,
  qrCodeString,
}: AcceptingRingFormProps): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();

  const { watch, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const formValues = watch(['spouseRing']);

  const history = useHistory();

  const { connection, proposalInfo } = useSnapshot(state);

  React.useEffect(() => {
    if (!proposalPubKey) {
      return history.replace('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (d: typeof defaultValues) => {
    try {
      setIsSubmitting(true);
      console.log(d);

      // Upload JSON to IPFS and get IPFS CID
      const { data } = await uploadJsonToIpfs({ ...proposalInfo.data, spouseRing: rings[d.spouseRing] });

      if (data) {
        console.log(data);

        const provider = getProvider();

        if (!provider?.publicKey) return;

        const programIdPublicKey = new PublicKey(config.programId);

        let weddingData = '';
        weddingData += '\x04';

        const instruction = new TransactionInstruction({
          keys: [
            {
              pubkey: provider.publicKey as PublicKey,
              isSigner: true,
              isWritable: false,
            },
            {
              pubkey: new PublicKey(proposalPubKey),
              isSigner: false,
              isWritable: true,
            },
          ],
          programId: programIdPublicKey,
          data: Buffer.from(weddingData, 'utf-8'),
        });
        const transaction = new Transaction().add(instruction);
        transaction.feePayer = provider.publicKey;
        console.log('Getting recent blockhash');
        (transaction as any).recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        if (transaction) {
          let signed = await provider.signTransaction(transaction);
          console.log('Got signature, submitting transaction');
          let signature = await connection.sendRawTransaction(signed.serialize());
          console.log('Submitted transaction ' + signature + ', awaiting confirmation');
          // ! This line throws error and will not allow program to execute further.
          // await connection.confirmTransaction(signature);
          console.log('Transaction ' + signature + ' confirmed');
          history.push({
            pathname: `/engagement/${proposalPubKey}`,
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
    <AcceptingRingFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>
                Choose a Ring for <span>{proposerName}</span>
              </h2>
              <RingSelect label="Pick a ring" onChange={(value) => setValue('spouseRing', value)} />
              <SolidButton type="submit" className="solid-button">
                {isSubmitting && <Spinner className="spinner" />}
                {isSubmitting ? 'Minting...' : 'MINT AND ACCEPT'}
              </SolidButton>
            </form>
          </FlexColumnWrapper>
          <FlexColumnWrapper className="col-2">
            <h4>Preview</h4>
            <AcceptingRingPreview
              proposerName={proposerName}
              spouseName={spouseName}
              proposerRing={proposerRing || rings[0]}
              spouseRing={rings[formValues[0]]}
              qrCodeString={qrCodeString}
            />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </Container>
    </AcceptingRingFormWrapper>
  );
};

export default AcceptingRingForm;
