import React from 'react';

interface Props {
  title: string;
  description: string;
  imgSrc: string;
  imgOnRight: boolean;
}

const AlternateSection: React.FC<Props> = ({ title, description, imgSrc, imgOnRight }) => {
  const sectionClasses = 'flex items-center py-8';

  const content = (
    <div className="w-full md:w-1/2 p-8 text-center md:text-left">
      <h2 className="text-3xl mb-4">{title}</h2>
      <p className="text-lg">{description}</p>
    </div>
  );

  const image = (
    <div className="w-full md:w-1/2">
      <img src={imgSrc} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
    </div>
  );

  return (
    <div className={sectionClasses}>
      {imgOnRight ? [content, image] : [image, content]}
    </div>
  );
};

export default AlternateSection;
