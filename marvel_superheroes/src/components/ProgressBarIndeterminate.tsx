import React from 'react';
import ProgressBar from '@atlaskit/progress-bar';

const ProgressBarIndeterminate = (): JSX.Element => {
  return (
    <div style={{ backgroundColor: 'red', border: '1px solid white' }}>
      <ProgressBar isIndeterminate />
    </div>
  );
};

export default ProgressBarIndeterminate;
