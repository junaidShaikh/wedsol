import styled from 'styled-components/macro';
import clsx from 'clsx';
import { IoLink } from 'react-icons/io5';

import FlexRowWrapper from './common/wrappers/FlexRowWrapper';

const ProposalLinkWrapper = styled.div`
  width: 100%;
  height: auto;

  & > ${FlexRowWrapper} {
    justify-content: space-between;

    & > svg {
      width: 24px;
      height: 24px;
    }

    & > p {
      font-weight: 500;
      font-size: 21px;
      line-height: 25px;

      color: rgba(6, 6, 6, 0.4);
    }
  }
`;

interface ProposalLinkProps {
  className?: string;
  link: string;
}

const ProposalLink = ({ className, link }: ProposalLinkProps): JSX.Element => {
  return (
    <ProposalLinkWrapper className={clsx(className)}>
      <FlexRowWrapper>
        <IoLink />
        <p>{link}</p>
      </FlexRowWrapper>
    </ProposalLinkWrapper>
  );
};

export default ProposalLink;
