import styled from 'styled-components/macro';

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: hidden;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default ScrollWrapper;
