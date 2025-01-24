import React from 'react';

const DebugInfo = ({ debugInfo, totalBlocks, totalEnvironmentObjects }) => {
  return (
    <div className="debug-info">
      <p>
        Mouse: x:{debugInfo.mouse.x}, y:{debugInfo.mouse.y}, z:{debugInfo.mouse.z}
      </p>
      <p>
        Preview: x:{debugInfo.preview.x}, y:{debugInfo.preview.y}, z:{debugInfo.preview.z}
      </p>
      <p>Total Blocks: {totalBlocks}</p>
      <p>Total Env. Objects: {totalEnvironmentObjects}</p>
    </div>
  );
};

export default DebugInfo;
