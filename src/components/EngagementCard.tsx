import styled from 'styled-components/macro';
import { format } from 'date-fns';
import clsx from 'clsx';
import QRCode from 'react-qr-code';

import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

import accountPlaceholder from 'assets/images/account-placeholder.png';

const EngagementCardWrapper = styled.div`
  width: 100%;
  max-width: 851px;
  height: auto;

  padding: 38px 44px;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 15px;

  .row-1 {
    justify-content: center;
    align-items: center;

    h1 {
      font-family: var(--prata);
      font-weight: normal;
      font-size: 31px;
      line-height: 42px;

      color: #000000;
    }
  }

  .row-2 {
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;

    h4 {
      font-family: var(--prata);
      font-weight: normal;
      font-size: 19px;
      line-height: 26px;

      color: rgba(0, 0, 0, 0.42);
    }
  }

  .row-3 {
    margin-bottom: 42px;

    ${FlexColumnWrapper} {
      flex: 0 1 50%;

      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        max-width: 227px;
        max-height: 227px;
        object-fit: contain;
      }
    }
  }

  .row-4 {
    min-height: 138px;
    justify-content: space-between;
    align-items: center;

    & > ${FlexColumnWrapper} {
      width: auto;
      min-height: 138px;

      &:first-of-type {
        justify-content: flex-end;
      }

      &:last-of-type {
        justify-content: center;
        align-items: center;
      }

      & > ${FlexRowWrapper} {
        margin-bottom: 28px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .qr-wrapper {
      padding: 5px;
    }

    .signed-by {
      font-size: 19px;
      line-height: 23px;
      text-transform: uppercase;

      color: #6d6d6f;
    }

    .signer {
      width: auto;
      margin-right: 32px;
      align-items: center;

      &:last-of-type {
        margin-right: 0;
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 13px;
      }

      p {
        font-size: 19px;
        line-height: 23px;
        text-transform: capitalize;

        color: #868686;
      }
    }
  }
`;

interface EngagementCardProps {
  className?: string;
  proposerName: string;
  spouseName: string;
  engagementDate: string;
  proposerRing: string;
  spouseRing: string;
  signedBy: string[];
  qrCodeString: string;
}

const EngagementCard = ({
  className,
  proposerName,
  spouseName,
  engagementDate,
  proposerRing,
  spouseRing,
  signedBy,
  qrCodeString,
}: EngagementCardProps): JSX.Element => {
  return (
    <EngagementCardWrapper className={clsx(className)}>
      <FlexColumnWrapper>
        <FlexRowWrapper className="row-1">
          <h1>
            {proposerName} & {spouseName}
          </h1>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-2">
          <h4>engaged on {format(new Date(engagementDate), 'dd/MM/yyyy')}</h4>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-3">
          <FlexColumnWrapper>
            <img src={proposerRing} alt="" />
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <img src={spouseRing} alt="" />
          </FlexColumnWrapper>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-4">
          <FlexColumnWrapper>
            <FlexRowWrapper>
              <p className="signed-by">Signed By</p>
            </FlexRowWrapper>
            <FlexRowWrapper>
              {signedBy
                .filter((signer) => Boolean(signer))
                .map((signer, i) => (
                  <FlexRowWrapper key={i} className="signer">
                    <img src={accountPlaceholder} alt="" />
                    <p>{signer}</p>
                  </FlexRowWrapper>
                ))}
            </FlexRowWrapper>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <div className="qr-wrapper">
              <QRCode size={128} value={qrCodeString} />
            </div>
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </EngagementCardWrapper>
  );
};

export default EngagementCard;
