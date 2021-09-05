import styled from 'styled-components/macro';
import clsx from 'clsx';
import Spinner from './Spinner';

const FullPageSpinnerWrapper = styled.main`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: grid;
  place-items: center;

  background-color: #fff;

  .spinner {
    svg {
      & .path {
        stroke: #000 !important;
      }
    }
  }
`;

interface FullPageSpinnerProps {
  className?: string;
}

const FullPageSpinner = ({ className }: FullPageSpinnerProps): JSX.Element => {
  return (
    <FullPageSpinnerWrapper className={clsx(className)}>
      <Spinner className="spinner" />
    </FullPageSpinnerWrapper>
  );
};

export default FullPageSpinner;
