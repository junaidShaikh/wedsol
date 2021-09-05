import styled from 'styled-components/macro';
import clsx from 'clsx';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

const MarriagePreviewWrapper = styled.div`
  width: 100%;
  max-width: 517px;
  min-height: 371px;
  height: auto;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 50px 32px 40px 32px;
  position: relative;

  .qr-wrapper {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  & > ${FlexColumnWrapper} {
    & > ${FlexRowWrapper} {
      justify-content: center;

      &.row-1 {
        margin-bottom: 4px;

        h2 {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 24px;

          color: rgba(0, 0, 0, 0.5);
        }
      }

      &.row-2 {
        margin-bottom: 12px;

        h1 {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 31px;
          line-height: 42px;
          text-align: center;

          color: #000000;
        }
      }

      &.row-3 {
        margin-bottom: 24px;

        p {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 18px;
          line-height: 26px;

          color: rgba(0, 0, 0, 0.42);
        }
      }

      &.row-4 {
        margin-bottom: 32px;

        p {
          font-family: var(--prata);
          font-weight: normal;
          font-size: 22px;

          color: rgba(0, 0, 0, 0.42);
        }
      }

      &.row-5 {
        h5 {
          font-weight: 500;
          font-size: 18px;
          line-height: 23px;
          text-transform: uppercase;

          color: #6d6d6f;
          margin-bottom: 12px;
        }

        p {
          max-width: 200px;

          font-family: var(--prata);
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;

          color: rgba(0, 0, 0, 0.37);
        }
      }
    }
  }
`;

interface MarriagePreviewProps {
  className?: string;
  proposerName: string;
  spouseName: string;
  engagementDate: string;
  proposerVows: string;
  spouseVows: string;
  qrCodeString: string;
}

const MarriagePreview = ({
  className,
  proposerName,
  spouseName,
  engagementDate,
  proposerVows,
  spouseVows,
  qrCodeString,
}: MarriagePreviewProps): JSX.Element => {
  return (
    <MarriagePreviewWrapper className={clsx(className)}>
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
          <p>engaged on {format(new Date(engagementDate ?? Date().toString()), 'dd/MM/yyyy')}</p>
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
    </MarriagePreviewWrapper>
  );
};

export default MarriagePreview;
