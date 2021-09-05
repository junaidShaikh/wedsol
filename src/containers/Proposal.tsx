import * as React from 'react';
import styled from 'styled-components/macro';
import { useSnapshot } from 'valtio';

import {
  state,
  setProposalInfoLoading,
  setProposalInfoData,
  setProposalInfoFailure,
  setProposalInfoError,
} from 'state';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import SectionTitle from 'components/common/SectionTitle';
import ProposalStages from 'components/ProposalStages';
import FullPageSpinner from 'components/common/FullPageSpinner';

import getPubKeyFromSeed from 'utils/getPubKeyFromSeed';
import getAccountInfo from 'utils/getAccountInfo';
import getActualSigners from 'utils/getActualSigners';
import { fetchIpfsJsonData } from 'apis/ipfs';
import shortenWalletAddress from 'utils/shortenWalletAddress';

const ProposalWrapper = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 60px 0 160px 0;

  .connected-account-pill {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 55px;
    line-height: 73px;
    margin-bottom: 64px;
  }
`;

const Proposal = (): JSX.Element => {
  const [disableProposalFlow, setDisableProposalFlow] = React.useState(false);
  const [disableMarriageFlow, setDisableMarriageFlow] = React.useState(false);

  const snap = useSnapshot(state);

  React.useEffect(() => {
    try {
      (async () => {
        setProposalInfoLoading();
        setDisableProposalFlow(false);

        const proposalPubKey = await getPubKeyFromSeed();
        const accountInfo = await getAccountInfo(proposalPubKey);
        if (accountInfo === null) {
          setProposalInfoFailure();
          setDisableMarriageFlow(true);
          return;
        }
        const { data } = await fetchIpfsJsonData(accountInfo?.extra?.substr(0, 46));
        if (data) {
          setProposalInfoData({
            ...data,
            signers: getActualSigners([accountInfo.partner1, accountInfo.partner2]).map((signer) =>
              shortenWalletAddress(signer, 5)
            ),
          });
        } else {
          setProposalInfoFailure();
        }
      })();
    } catch (error) {
      console.log(error);
      setProposalInfoError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (snap.proposalInfo.isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <ProposalWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <SectionTitle className="section-title">Start a new proposal</SectionTitle>
      <ProposalStages disableProposalFlow={disableProposalFlow} disableMarriageFlow={disableMarriageFlow} />
    </ProposalWrapper>
  );
};

export default Proposal;
