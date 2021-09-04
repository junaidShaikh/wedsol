import styled from 'styled-components/macro';
import clsx from 'clsx';
import { MdContentCopy } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

import { useClipboard } from 'use-clipboard-copy';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

const CopyTextWrapper = styled.div`
  width: 100%;
  min-height: 50px;

  ${FlexRowWrapper} {
    align-items: center;
    justify-content: space-between;

    padding-bottom: 18px;
    border-bottom: 1px solid #bbbbbb;

    p {
      max-width: 90%;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: rgba(6, 6, 6, 0.6);
      word-wrap: break-word;
    }

    button {
      background: transparent;
      outline: none;
      border: none;

      cursor: pointer;
    }

    svg {
      width: 24px;
      height: 24px;
      color: #dadada;
    }
  }
`;

interface CopyTextProps {
  className?: string;
  text: string;
}

const CopyText = ({ className, text }: CopyTextProps): JSX.Element => {
  const clipboard = useClipboard({
    copiedTimeout: 2000, // timeout duration in milliseconds
  });

  return (
    <CopyTextWrapper className={clsx(className)}>
      <FlexRowWrapper>
        <p>{text}</p>
        <button
          onClick={() => {
            clipboard.copy(text);
          }}
        >
          {clipboard.copied ? <FaCheckCircle style={{ color: 'green' }} /> : <MdContentCopy />}
        </button>
      </FlexRowWrapper>
    </CopyTextWrapper>
  );
};

export default CopyText;
