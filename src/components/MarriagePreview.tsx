import styled from 'styled-components/macro';

import QRCode from 'react-qr-code';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';

const MarriagePreviewWrapper = styled.div`
  width: 100%;
  max-width: 517px;
  min-height: 371px;
  height: auto;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 50px 44px 40px 44px;

  & > ${FlexColumnWrapper} {
    min-height: 281px;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;

interface MarriagePreviewProps {
  qrCodeString: string;
}

const MarriagePreview = ({ qrCodeString }: MarriagePreviewProps): JSX.Element => {
  return (
    <MarriagePreviewWrapper>
      <FlexColumnWrapper>
        <QRCode size={64} value={qrCodeString} />
      </FlexColumnWrapper>
    </MarriagePreviewWrapper>
  );
};

export default MarriagePreview;
