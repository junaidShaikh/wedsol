import styled from 'styled-components/macro';
import clsx from 'clsx';

const SectionTitleWrapper = styled.h1`
  max-width: 515px;
  font-family: var(--pt-serif);

  font-size: 42px;
  font-weight: normal;
  line-height: 56px;
  text-align: center;
`;

interface SectionTitleProps {
  className?: string;
  children: string;
}

const SectionTitle = ({ className, children }: SectionTitleProps): JSX.Element => {
  return <SectionTitleWrapper className={clsx(className)}>{children}</SectionTitleWrapper>;
};

export default SectionTitle;
