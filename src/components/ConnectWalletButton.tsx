import styled from 'styled-components/macro';
import clsx from 'clsx';

import { getProvider } from 'utils/getProvider';

import phantomLogo from 'assets/logos/phantom.png';

const ConnectWalletButtonWrapper = styled.button`
  width: 250px;
  height: 50px;

  background: #292735;
  border-radius: 54px;

  outline: none;
  border: none;
  cursor: pointer;

  font-family: Inter;
  font-size: 15px;
  line-height: 18px;

  color: #ffffff;
  position: relative;

  .phantom-logo {
    position: absolute;
    width: 24px;
    height: 20px;
    top: 50%;
    left: 25px;
    transform: translate(-50%, -50%);
  }
`;

interface ConnectWalletButtonProps {
  className?: string;
}

const ConnectWalletButton = ({ className }: ConnectWalletButtonProps): JSX.Element => {
  const provider = getProvider();

  return (
    <ConnectWalletButtonWrapper
      className={clsx(className)}
      onClick={() => {
        provider?.connect();
      }}
    >
      <img className="phantom-logo" src={phantomLogo} alt="" /> Connect Wallet
    </ConnectWalletButtonWrapper>
  );
};

export default ConnectWalletButton;
