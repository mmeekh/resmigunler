import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ExperienceBarProps {
  liteMode: boolean;
  onToggleLite: (value: boolean) => void;
  lowDataDetected: boolean;
  isOffline: boolean;
  pwaReady: boolean;
}

const ExperienceBar: React.FC<ExperienceBarProps> = () => {
  return null;
};

export default ExperienceBar;
