import * as React from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';

import { state } from 'state';

import Container from 'components/common/wrappers/Container';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import SolidButton from 'components/common/SolidButton';
import ProposalLink from 'components/ProposalLink';
import SignerCard from 'components/SignerCard';
import AssetCardMini from 'components/AssetCardMini';
import Spinner from 'components/common/Spinner';
import ConnectWalletButton from 'components/ConnectWalletButton';

import { getProvider } from 'utils/getProvider';
import { uploadJsonToIpfs } from 'apis/ipfs';
import config from 'config';
import getConnection from 'utils/getConnection';

const DivorceFormWrapper = styled.div`
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
      max-width: 526px;

      label {
        display: block;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        color: rgba(6, 6, 6, 0.4);
        margin-bottom: 32px;
      }

      .asset-card {
        margin-bottom: 32px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }

      button.solid-button {
        margin-top: 45px;
        background: #f36a71 !important;
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

      .connect-wallet-button {
        width: 100%;
        margin: 45px 0 0 0;
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

const DivorceForm = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { proposalPubKey } = useParams<{ proposalPubKey: string }>();

  const history = useHistory();

  const snap = useSnapshot(state);

  const connection = getConnection();

  React.useEffect(() => {
    if (!proposalPubKey) {
      history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const provider = getProvider();

      if (!provider?.publicKey) return;

      const programIdPublicKey = new PublicKey(config.programId);

      // Upload JSON to IPFS and get IPFS CID
      const { data } = await uploadJsonToIpfs({});

      if (data) {
        console.log(data);

        const divorceData = Buffer.alloc(64);
        divorceData[0] = 6;

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
          data: divorceData,
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
          await connection.confirmTransaction(signature);
          console.log('Transaction ' + signature + ' confirmed');
          history.push({
            pathname: `/`,
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
    <DivorceFormWrapper>
      <Container>
        <FlexRowWrapper>
          <FlexColumnWrapper className="col-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label>After Divorce</label>
              <AssetCardMini
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCardMini
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              <AssetCardMini
                className="asset-card"
                assetName="New York House"
                assetDescription="Our House in New York"
                assetValue="$1.5M"
                assetOwnershipPercentage="50:50"
              />
              {snap.isWalletConnected ? (
                <SolidButton type="submit" className="solid-button">
                  {isSubmitting && <Spinner className="spinner" />}
                  {isSubmitting ? 'Signing...' : 'SIGN AND DIVORCE'}
                </SolidButton>
              ) : (
                <ConnectWalletButton className="connect-wallet-button" />
              )}
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
    </DivorceFormWrapper>
  );
};

export default DivorceForm;
