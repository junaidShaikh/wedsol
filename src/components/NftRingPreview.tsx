import styled from 'styled-components/macro';
import QRCode from 'react-qr-code';

import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';
import FlexRowWrapper from './common/wrappers/FlexRowWrapper';

import rings from './common/rings';

const NftRingPreviewWrapper = styled.div`
  width: 100%;
  max-width: 517px;
  min-height: 371px;
  height: auto;

  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.16);
  border-radius: 11px;

  padding: 50px 44px;

  .row-1 {
    margin-bottom: 24px;

    h3 {
      font-family: Prata;
      font-size: 23px;
      line-height: 31px;

      color: #000000;
    }
  }

  .row-2 {
    margin-bottom: 18px;

    & > ${FlexColumnWrapper} {
      &:first-of-type {
        flex: 0 1 35%;

        img {
          width: 100%;
          object-fit: contain;
        }
      }

      &:last-of-type {
        flex: 0 1 65%;

        p {
          font-family: Prata;
          font-size: 18px;
          line-height: 24px;

          color: rgba(0, 0, 0, 0.37);
        }
      }
    }
  }

  .row-3 {
    height: 60px;
    display: grid;
    place-items: center;

    position: relative;

    .accept-button {
      width: 164px;
      height: 35px;

      background: #ffd7cb;
      border-radius: 63px;

      outline: none;
      border: none;
      cursor: pointer;

      font-weight: 500;
      font-size: 17px;
      line-height: 21px;

      color: rgba(0, 0, 0, 0.44);
    }

    .qr-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      width: 60px;
      height: 60px;
      padding: 5px;

      & > svg {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
`;

interface NftRingPreviewProps {
  proposerName?: string;
  spouseName: string;
  ring: number;
  message: string;
}

const placeholderText =
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.';

const NftRingPreview = ({ proposerName, spouseName, ring, message }: NftRingPreviewProps): JSX.Element => {
  return (
    <NftRingPreviewWrapper>
      <FlexColumnWrapper>
        <FlexRowWrapper className="row-1">
          <h3>Dear {spouseName || 'Priyanka'}</h3>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-2">
          <FlexColumnWrapper>
            <img src={rings?.[ring ?? 0]} alt="" />
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <p>{message || placeholderText}</p>
          </FlexColumnWrapper>
        </FlexRowWrapper>
        <FlexRowWrapper className="row-3">
          <button className="accept-button">Accept</button>
          <div className="qr-wrapper">
            <QRCode size={50} value="hey" />
          </div>
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </NftRingPreviewWrapper>
  );
};

export default NftRingPreview;
