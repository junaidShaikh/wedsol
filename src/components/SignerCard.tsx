import styled from 'styled-components/macro';
import clsx from 'clsx';

import FlexRowWrapper from './common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';

import shortenWalletAddress from 'utils/shortenWalletAddress';

import accountPlaceholder from 'assets/images/account-placeholder.png';

const SignerCardWrapper = styled.div`
  width: 100%;
  max-width: 517px;
  min-height: 99px;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 24px;

  & > ${FlexRowWrapper} {
    & > ${FlexColumnWrapper} {
      &:first-of-type {
        flex: 0 1 15%;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      &:last-of-type {
        flex: 0 1 85%;

        & > ${FlexRowWrapper} {
          margin-bottom: 4px;

          &:last-of-type {
            margin-bottom: 0;
          }

          .name {
            font-size: 19px;
            line-height: 23px;
            text-transform: capitalize;
            color: #868686;
          }

          .address {
            font-size: 19px;
            line-height: 23px;

            color: rgba(57, 46, 46, 0.28);
          }
        }
      }
    }
  }
`;

interface SignerCardProps {
  className?: string;
  signerName: string;
  signerAccountAddress: string;
}

const SignerCard = ({ className, signerName, signerAccountAddress }: SignerCardProps): JSX.Element => {
  return (
    <SignerCardWrapper className={clsx(className)}>
      <FlexRowWrapper>
        <FlexColumnWrapper>
          <img src={accountPlaceholder} alt="" />
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <FlexRowWrapper>
            <p className="name">{signerName}</p>
          </FlexRowWrapper>
          <FlexRowWrapper>
            <p className="address">{shortenWalletAddress(signerAccountAddress, 10)}</p>
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </SignerCardWrapper>
  );
};

export default SignerCard;
