import styled from 'styled-components/macro';
import clsx from 'clsx';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

const BlockConfirmationsWrapper = styled.div`
  width: 100%;
  height: auto;

  ${FlexRowWrapper} {
    justify-content: space-between;

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.085em;
      text-transform: uppercase;

      color: rgba(0, 0, 0, 0.41);

      span {
        color: #000;
      }
    }
  }
`;

interface BlockConfirmationsProps {
  className?: string;
  confirmedBlocks: number;
  totalBlocks: number;
}

const BlockConfirmations = ({ className, confirmedBlocks, totalBlocks }: BlockConfirmationsProps): JSX.Element => {
  return (
    <BlockConfirmationsWrapper className={clsx(className)}>
      <FlexRowWrapper>
        <p>Block Confirmations</p>
        <p>
          <span>{confirmedBlocks}</span>/{totalBlocks}
        </p>
      </FlexRowWrapper>
    </BlockConfirmationsWrapper>
  );
};

export default BlockConfirmations;
