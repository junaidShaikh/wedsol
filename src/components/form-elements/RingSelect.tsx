import * as React from 'react';
import styled from 'styled-components/macro';
import { FaCheckCircle } from 'react-icons/fa';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

import rings from 'components/common/rings';

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

    background-color: #ececec;
    border-radius: 4px;
    margin-right: 12px;

    display: grid;
    place-items: center;

    cursor: pointer;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    svg {
      z-index: 10;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

interface RingSelectProps {
  label?: string;
  defaultValue?: number;
  onChange: (value: number) => void;
}

const RingSelect = ({ label, defaultValue, onChange }: RingSelectProps): JSX.Element => {
  const [selectedRing, setSelectedRing] = React.useState(defaultValue ?? 0);

  return (
    <RingSelectWrapper>
      {label ? <label>{label}</label> : null}
      <FlexRowWrapper>
        {rings.map((ring: string, i) => (
          <div
            className="ring-wrapper"
            key={i}
            onClick={() => {
              setSelectedRing(i);
              onChange(i);
            }}
            style={{
              border: selectedRing === i ? '1px solid black' : '1px solid transparent',
            }}
          >
            <img src={ring} alt="" style={{ opacity: selectedRing === i ? 0.3 : 1 }} />
            {selectedRing === i ? <FaCheckCircle /> : null}
          </div>
        ))}
      </FlexRowWrapper>
    </RingSelectWrapper>
  );
};

export default RingSelect;
