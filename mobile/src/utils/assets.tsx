import React from 'react';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Circle,
  Path,
  Ellipse,
  Rect,
  Polygon,
  G,
  Text,
  Line,
} from 'react-native-svg';

export const ASSETS = {
  // Postcards and backgrounds
  pineForest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
  rainyWindow: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1000&q=80',
  hearthFire: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
  meadowLandscape: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
  windowGramophone: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
};

// Custom React Native SVG Avatar Component
export const AvatarImage: React.FC<{ size?: number }> = ({ size = 100 }) => {
  return (
    <Svg viewBox="0 0 100 100" width={size} height={size}>
      <Defs>
        <RadialGradient id="bgGrad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor="#E8F4D9" />
          <Stop offset="70%" stopColor="#C5DEAB" />
          <Stop offset="100%" stopColor="#93B874" />
        </RadialGradient>
        <LinearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#80A64C" />
          <Stop offset="100%" stopColor="#4C7026" />
        </LinearGradient>
        <RadialGradient id="faceGrad" cx="45%" cy="40%" rx="60%" ry="60%" fx="45%" fy="40%">
          <Stop offset="0%" stopColor="#FFFDF7" />
          <Stop offset="85%" stopColor="#F2E8CE" />
          <Stop offset="100%" stopColor="#E2D0A7" />
        </RadialGradient>
      </Defs>
      {/* Background Halo */}
      <Circle cx="50" cy="50" r="48" fill="url(#bgGrad)" stroke="#749649" strokeWidth="2" />
      
      {/* Forest Crown Leaves */}
      <Path d="M50 14 C40 8 28 20 38 28 C45 22 50 14 50 14 Z" fill="url(#leafGrad)" />
      <Path d="M50 14 C60 8 72 20 62 28 C55 22 50 14 50 14 Z" fill="url(#leafGrad)" />
      <Path d="M50 8 C46 2 54 2 50 8 Z" fill="#6A8F36" />
      <Circle cx="34" cy="26" r="3.5" fill="#EE7960" />
      <Circle cx="66" cy="26" r="3.5" fill="#F4A261" />
      <Circle cx="50" cy="18" r="2.5" fill="#E9C46A" />

      {/* Spirit Head / Body */}
      <Ellipse cx="50" cy="54" rx="28" ry="26" fill="url(#faceGrad)" />
      
      {/* Rosy Cheeks */}
      <Circle cx="36" cy="58" r="5" fill="#EE7960" opacity="0.35" />
      <Circle cx="64" cy="58" r="5" fill="#EE7960" opacity="0.35" />
      
      {/* Gentle Eyes */}
      <Ellipse cx="40" cy="50" rx="2.5" ry="3.5" fill="#314421" />
      <Circle cx="41" cy="48.5" r="1" fill="#FFFFFF" />
      <Ellipse cx="60" cy="50" rx="2.5" ry="3.5" fill="#314421" />
      <Circle cx="61" cy="48.5" r="1" fill="#FFFFFF" />
      
      {/* Peaceful Smile */}
      <Path d="M46 58 Q50 63 54 58" fill="none" stroke="#314421" strokeWidth="2" strokeLinecap="round" />
      
      {/* Sprout antenna */}
      <Path d="M50 28 Q50 18 45 15 Q43 14 47 13 Q53 14 50 28" fill="#5F832B" />
      
      {/* Small Clover in hands */}
      <Path d="M46 72 Q50 70 54 72" stroke="#688A3B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="50" cy="70" r="3" fill="#88B849" />
    </Svg>
  );
};

// SVG Stamp Components
interface StampProps {
  color?: string;
  value?: string;
  width?: number;
  height?: number;
}

export const PineTreeStamp: React.FC<StampProps> = ({
  color = "#4D6B35",
  value = "20¢",
  width = 48,
  height = 58,
}) => {
  return (
    <Svg viewBox="0 0 70 85" width={width} height={height}>
      <Rect x="3" y="3" width="64" height="79" rx="4" fill="#F8FAF4" stroke={color} strokeWidth="1.5" strokeDasharray="3,2.5" />
      <Rect x="7" y="7" width="56" height="71" fill="#EDF3E6" />
      <Polygon points="35,16 23,32 47,32" fill={color} />
      <Polygon points="35,27 20,44 50,44" fill={color} />
      <Polygon points="35,39 17,58 53,58" fill={color} />
      <Rect x="32" y="58" width="6" height="8" fill="#755230" />
      <Text x="35" y="73" fontFamily="System" fontSize="9" fontWeight="bold" fill={color} textAnchor="middle">{value}</Text>
    </Svg>
  );
};

export const RaindropStamp: React.FC<StampProps> = ({
  color = "#4C758F",
  value = "15¢",
  width = 48,
  height = 58,
}) => {
  return (
    <Svg viewBox="0 0 70 85" width={width} height={height}>
      <Rect x="3" y="3" width="64" height="79" rx="4" fill="#F4F8FA" stroke={color} strokeWidth="1.5" strokeDasharray="3,2.5" />
      <Rect x="7" y="7" width="56" height="71" fill="#E6EEF3" />
      <Path d="M35 18 C35 18 20 38 20 48 C20 57 26.7 62 35 62 C43.3 62 50 57 50 48 C50 38 35 18 35 18 Z" fill={color} />
      <Ellipse cx="30" cy="46" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 30 46)" />
      <Text x="35" y="73" fontFamily="System" fontSize="9" fontWeight="bold" fill={color} textAnchor="middle">{value}</Text>
    </Svg>
  );
};

export const HearthFireStamp: React.FC<StampProps> = ({
  color = "#995838",
  value = "30¢",
  width = 48,
  height = 58,
}) => {
  return (
    <Svg viewBox="0 0 70 85" width={width} height={height}>
      <Rect x="3" y="3" width="64" height="79" rx="4" fill="#FAF5F0" stroke={color} strokeWidth="1.5" strokeDasharray="3,2.5" />
      <Rect x="7" y="7" width="56" height="71" fill="#F4E9DF" />
      <Path d="M22 60 L22 32 Q35 24 48 32 L48 60 Z" fill="none" stroke={color} strokeWidth="2" />
      <Path d="M28 58 Q35 34 42 58 Z" fill="#EE7960" />
      <Path d="M32 58 Q35 44 38 58 Z" fill="#F4A261" />
      <Line x1="18" y1="60" x2="52" y2="60" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Text x="35" y="73" fontFamily="System" fontSize="9" fontWeight="bold" fill={color} textAnchor="middle">{value}</Text>
    </Svg>
  );
};

export const renderStampIcon = (iconName: string, color: string, value: string) => {
  switch (iconName) {
    case 'pineTree':
      return <PineTreeStamp color={color} value={value} />;
    case 'raindrop':
      return <RaindropStamp color={color} value={value} />;
    case 'hearthFire':
      return <HearthFireStamp color={color} value={value} />;
    default:
      return <PineTreeStamp color={color} value={value} />;
  }
};
