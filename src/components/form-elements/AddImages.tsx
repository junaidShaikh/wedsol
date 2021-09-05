import * as React from 'react';
import styled from 'styled-components/macro';
import clsx from 'clsx';
import axios from 'axios';
import { FaPlus, FaSpinner } from 'react-icons/fa';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

const AddImagesWrapper = styled.div`
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
    overflow: hidden;

    &:last-of-type {
      margin-right: 0;
    }

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`;

interface AddImagesProps {
  className?: string;
  label?: string;
  onNewImage: (imageUrls: string[]) => void;
}

const AddImages = ({ className, label, onNewImage }: AddImagesProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.post<{ url: string }>('https://snft.ocg.technology/files/upload', formData);
        if (data) {
          setImageUrls((prevState) => {
            if (imageUrls.length === 5) {
              onNewImage(prevState);
              return prevState;
            }
            const updatedImageUrls = [...prevState, data.url];
            onNewImage(updatedImageUrls);
            return updatedImageUrls;
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddImagesWrapper className={clsx(className)}>
      {label ? <label>{label}</label> : null}
      <FlexRowWrapper>
        {new Array(5).fill(0).map((_, i) =>
          imageUrls.length === i ? (
            <div
              className="ring-wrapper"
              key={i}
              style={{ border: '1px solid black', cursor: loading ? 'not-allowed' : 'pointer' }}
              onClick={() => {
                if (!loading) {
                  fileInputRef.current?.click();
                }
              }}
            >
              {loading ? <FaSpinner /> : <FaPlus />}
              <input
                type="file"
                name="file"
                id="file"
                ref={fileInputRef}
                style={{ visibility: 'hidden', display: 'none' }}
                multiple={false}
                accept={'image/jpeg,image/png'}
                onChange={handleFile}
              />
            </div>
          ) : (
            <div className="ring-wrapper" key={i}>
              {imageUrls[i] ? <img src={imageUrls[i]} alt="" /> : null}
            </div>
          )
        )}
      </FlexRowWrapper>
    </AddImagesWrapper>
  );
};

export default AddImages;
