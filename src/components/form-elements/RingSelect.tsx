import * as React from 'react';
import styled from 'styled-components/macro';
import { FaCheckCircle } from 'react-icons/fa';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

const RingSelectWrapper = styled.div`
  width: 100%;
  margin-top: 24px;

  label {
    display: block;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;

    color: rgba(6, 6, 6, 0.4);
    margin-bottom: 24px;
  }

  .ring-wrapper {
    width: 74px;
    height: 74px;

    background: #ececec;
    border-radius: 4px;
    margin-right: 12px;

    display: grid;
    place-items: center;

    cursor: pointer;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

interface RingSelectProps {
  label?: string;
}

const RingSelect = ({ label }: RingSelectProps): JSX.Element => {
  const [selectedRing, setSelectedRing] = React.useState(1);

  return (
    <RingSelectWrapper>
      {label ? <label>{label}</label> : null}
      <FlexRowWrapper>
        {new Array(5).fill(0).map((_, i) => (
          <div
            className="ring-wrapper"
            key={i}
            onClick={() => setSelectedRing(i + 1)}
            style={{ border: selectedRing === i + 1 ? '1px solid black' : '1px solid transparent' }}
          >
            {selectedRing === i + 1 ? <FaCheckCircle /> : null}
          </div>
        ))}
      </FlexRowWrapper>
    </RingSelectWrapper>
  );
};

export default RingSelect;
