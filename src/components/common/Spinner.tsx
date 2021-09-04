import styled from 'styled-components/macro';
import clsx from 'clsx';

const SpinnerWrapper = styled.div`
  width: 50px;
  height: 50px;

  svg {
    animation: rotate 2s linear infinite;
    z-index: 2;

    & .path {
      stroke: #fff;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps): JSX.Element => {
  return (
    <SpinnerWrapper className={clsx(className)}>
      <svg viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </SpinnerWrapper>
  );
};

export default Spinner;
