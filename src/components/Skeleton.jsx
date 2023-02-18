import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Skeleton(props) {

  return (
    <div className="pizza-card">
      <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="137" cy="130" r="126" />
        <rect x="3" y="268" rx="5" ry="5" width="273" height="29" />
        <rect x="2" y="430" rx="5" ry="5" width="93" height="27" />
        <rect x="116" y="418" rx="25" ry="25" width="163" height="47" />
        <rect x="3" y="317" rx="5" ry="5" width="274" height="80" />
      </ContentLoader>
    </div>
  );
}