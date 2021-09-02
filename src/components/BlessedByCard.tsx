import styled from 'styled-components/macro';
import clsx from 'clsx';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from './common/wrappers/FlexRowWrapper';

import accountPlaceholder from 'assets/images/account-placeholder.png';
import shortenWalletAddress from 'utils/shortenWalletAddress';

const BlessedByCardWrapper = styled.div`
  width: 100%;
  min-height: 325px;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 0 16px;

  & > ${FlexColumnWrapper} {
    & > ${FlexRowWrapper} {
      padding: 12px 0 32px 0;

      .title {
        font-weight: 500;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.085em;
        text-transform: uppercase;

        color: rgba(0, 0, 0, 0.41);
      }
    }

    .blessing {
      border-bottom: 1px solid #dadada;
      margin-bottom: 24px;

      &:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
      }

      .row-1 {
        margin-bottom: 12px;

        p {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 14px;
          line-height: 19px;

          color: rgba(0, 0, 0, 0.37);

          span {
            color: #000;
          }
        }
      }

      .row-2 {
        padding-bottom: 20px;
        align-items: center;
        justify-content: space-between;

        .address-wrapper {
          width: auto;
          align-items: center;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 12px;
          }

          p {
            font-size: 15px;
            line-height: 18px;

            color: #868686;
          }
        }

        h4 {
          font-weight: bold;
          font-size: 15px;
          line-height: 18px;

          color: #393737;
        }
      }
    }
  }
`;

export interface Blessing {
  message: string;
  blessedBy: string;
  accountAddress: string;
  value: number;
}

interface BlessedByCardProps {
  className?: string;
  blessings: Blessing[];
}

const BlessedByCard = ({ className, blessings }: BlessedByCardProps): JSX.Element => {
  return (
    <BlessedByCardWrapper className={clsx(className)}>
      <FlexColumnWrapper>
        <FlexRowWrapper>
          <p className="title">Blessed By</p>
        </FlexRowWrapper>
        {blessings?.map((blessing: Blessing, i: number) => (
          <FlexColumnWrapper className="blessing" key={i}>
            <FlexRowWrapper className="row-1">
              <p>
                {blessing.message}&nbsp;-&nbsp;<span>{blessing.blessedBy}</span>
              </p>
            </FlexRowWrapper>
            <FlexRowWrapper className="row-2">
              <FlexRowWrapper className="address-wrapper">
                <img src={accountPlaceholder} alt="" />
                <p>{shortenWalletAddress(blessing.accountAddress, 5)}</p>
              </FlexRowWrapper>
              <h4>{blessing.value}&nbsp;SOL</h4>
            </FlexRowWrapper>
          </FlexColumnWrapper>
        ))}
      </FlexColumnWrapper>
    </BlessedByCardWrapper>
  );
};

export default BlessedByCard;
