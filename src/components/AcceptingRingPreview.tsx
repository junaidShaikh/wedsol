import styled from 'styled-components/macro';
import QRCode from 'react-qr-code';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from './common/wrappers/FlexRowWrapper';

const AcceptingRingPreviewWrapper = styled.div`
  width: 100%;
  max-width: 517px;
  min-height: 371px;
  height: auto;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 50px 44px 40px 44px;

  & > ${FlexColumnWrapper} {
    & > .row-1 {
      justify-content: center;
      margin-bottom: 36px;

      h3 {
        font-family: var(--prata);
        font-weight: normal;
        font-size: 23px;
        line-height: 31px;

        color: #000000;
      }
    }

    & > .row-2 {
      margin-bottom: 18px;

      & > ${FlexColumnWrapper} {
        flex: 0 1 50%;

        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          max-width: 138px;
          max-height: 138px;
          object-fit: contain;
        }
      }
    }

    & > .row-3 {
      justify-content: flex-end;
    }
  }
`;

interface AcceptingRingPreviewProps {
  proposerName: string;
  spouseName: string;
  proposerRing: string;
  spouseRing: string;
  qrCodeString: string;
}

const AcceptingRingPreview = ({
  proposerName,
  spouseName,
  proposerRing,
  spouseRing,
  qrCodeString,
}: AcceptingRingPreviewProps): JSX.Element => {
  return (
    <AcceptingRingPreviewWrapper>
      <FlexColumnWrapper>
        <FlexRowWrapper className="row-1">
          <h3>
            {proposerName} & {spouseName}
          </h3>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-2">
          <FlexColumnWrapper>
            <img src={proposerRing} alt="" />
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <img src={spouseRing} alt="" />
          </FlexColumnWrapper>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-3">
          <QRCode size={64} value={qrCodeString} />
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </AcceptingRingPreviewWrapper>
  );
};

export default AcceptingRingPreview;
