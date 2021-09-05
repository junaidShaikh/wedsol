import styled from 'styled-components/macro';
import clsx from 'clsx';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';

import FlexColumnWrapper from 'components/common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

const MarriageCertificateWrapper = styled.div`
  width: 100%;
  max-width: 835px;
  min-height: 538px;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 42px 54px;
  position: relative;

  .qr-wrapper {
    position: absolute;
    top: 42px;
    right: 54px;
  }

  & > ${FlexColumnWrapper} {
    & > ${FlexRowWrapper} {
      justify-content: center;

      &.row-1 {
        margin-bottom: 4px;

        h2 {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 31px;
          line-height: 42px;

          color: rgba(0, 0, 0, 0.5);
        }
      }

      &.row-2 {
        margin-bottom: 18px;

        h1 {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 31px;
          line-height: 42px;

          color: #000000;
        }
      }

      &.row-3 {
        margin-bottom: 24px;

        p {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 19px;
          line-height: 26px;

          color: rgba(0, 0, 0, 0.42);
        }
      }

      &.row-4 {
        margin-bottom: 54px;

        p {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 25px;
          line-height: 34px;

          color: rgba(0, 0, 0, 0.42);
        }
      }

      &.row-5 {
        h5 {
          font-weight: normal;
          font-size: 19px;
          line-height: 23px;
          text-transform: uppercase;

          color: #6d6d6f;
          margin-bottom: 18px;
        }

        p {
          max-width: 314px;

          font-family: var(--prata);
          font-weight: normal;
          font-size: 20px;
          line-height: 27px;

          color: rgba(0, 0, 0, 0.37);
        }
      }
    }
  }
`;

interface MarriageCertificateProps {
  className?: string;
  proposerName: string;
  spouseName: string;
  engagementDate: string;
  proposerVows: string;
  spouseVows: string;
  qrCodeString: string;
}

const MarriageCertificate = ({
  className,
  proposerName,
  spouseName,
  engagementDate,
  proposerVows,
  spouseVows,
  qrCodeString,
}: MarriageCertificateProps): JSX.Element => {
  return (
    <MarriageCertificateWrapper className={clsx(className)}>
      <FlexColumnWrapper>
        <div className="qr-wrapper">
          <QRCode size={64} value={qrCodeString} />
        </div>
        <FlexRowWrapper className="row-1">
          <h2>Marriage Certificate</h2>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-2">
          <h1>
            {proposerName} & {spouseName}
          </h1>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-3">
          <p>married on {format(new Date(engagementDate), 'dd/MM/yyyy')}</p>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-4">
          <p>In accordance of the following vows</p>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-5">
          <FlexColumnWrapper>
            <h5>{proposerName}'s vows</h5>
            <p>{proposerVows}</p>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <h5>{spouseName}'s vows</h5>
            <p>{spouseVows}</p>
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </MarriageCertificateWrapper>
  );
};

export default MarriageCertificate;
