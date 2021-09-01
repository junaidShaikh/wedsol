import styled from 'styled-components/macro';
import clsx from 'clsx';
import { useSnapshot } from 'valtio';
import { BiChevronDown } from 'react-icons/bi';

import { state } from 'state';
import shortenWalletAddress from 'utils/shortenWalletAddress';

import accountPlaceholder from 'assets/images/account-placeholder.png';

const ConnectedAccountPillWrapper = styled.div`
  width: 383px;
  height: 50px;

  background: #ffffff;
  border: 1px solid #dfdfdf;
  border-radius: 41px;

  display: grid;
  place-items: center;

  position: relative;
  cursor: pointer;

  .account-image {
    position: absolute;
    width: 30px;
    height: 30px;

    left: 10px;
  }

  p {
    font-size: 19px;
    line-height: 23px;

    color: #868686;
  }

  svg {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 15px;
    color: rgba(0, 0, 0, 0.54);
  }
`;

interface ConnectedAccountPillProps {
  className?: string;
}

const ConnectedAccountPill = ({ className }: ConnectedAccountPillProps): JSX.Element => {
  const snap = useSnapshot(state);

  return (
    <ConnectedAccountPillWrapper className={clsx(className)}>
      <img src={accountPlaceholder} alt="" className="account-image" />
      <p>{shortenWalletAddress(snap.walletAddress, 10)}</p>
      <BiChevronDown />
    </ConnectedAccountPillWrapper>
  );
};

export default ConnectedAccountPill;
