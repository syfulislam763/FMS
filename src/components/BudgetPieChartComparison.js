import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SinglePieChart = ({ 
  essential, 
  discretionary, 
  savings,
  title 
}) => {
  const size = 180;
  const center = size / 2;
  const radius = 75;

  // Colors for each section
  const colors = {
    essential: '#EF4444',      // Red
    discretionary: '#F59E0B',  // Orange
    savings: '#10B981',        // Green
  };

  // Calculate percentages
  const total = essential + discretionary + savings;
  const essentialPercent = (essential / total) * 100;
  const discretionaryPercent = (discretionary / total) * 100;
  const savingsPercent = (savings / total) * 100;

  // Function to create arc path
  const createArcPath = (startAngle, endAngle) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Calculate angles for each section
  let currentAngle = 0;
  const essentialAngle = (essentialPercent / 100) * 360;
  const discretionaryAngle = (discretionaryPercent / 100) * 360;
  const savingsAngle = (savingsPercent / 100) * 360;

  const essentialPath = createArcPath(currentAngle, currentAngle + essentialAngle);
  currentAngle += essentialAngle;
  
  const discretionaryPath = createArcPath(currentAngle, currentAngle + discretionaryAngle);
  currentAngle += discretionaryAngle;
  
  const savingsPath = createArcPath(currentAngle, currentAngle + savingsAngle);

  // Calculate label positions (middle of each slice)
  const getLabelPosition = (startAngle, sweepAngle) => {
    const angle = startAngle + sweepAngle / 2;
    const labelRadius = radius * 0.65;
    const pos = polarToCartesian(center, center, labelRadius, angle);
    return pos;
  };

  let labelAngle = 0;
  const essentialLabelPos = getLabelPosition(labelAngle, essentialAngle);
  labelAngle += essentialAngle;
  
  const discretionaryLabelPos = getLabelPosition(labelAngle, discretionaryAngle);
  labelAngle += discretionaryAngle;
  
  const savingsLabelPos = getLabelPosition(labelAngle, savingsAngle);

  return (
    <View className="items-center flex-1">
      {/* Title */}
      <Text className="text-base font-bold text-gray-800 mb-4">{title}</Text>
      
      {/* Pie Chart */}
      <View className="mb-4">
        <Svg width={size} height={size}>
          {/* Essential slice */}
          <Path
            d={essentialPath}
            fill={colors.essential}
          />
          
          {/* Discretionary slice */}
          <Path
            d={discretionaryPath}
            fill={colors.discretionary}
          />
          
          {/* Savings slice */}
          <Path
            d={savingsPath}
            fill={colors.savings}
          />
        </Svg>

        {/* Percentage labels on slices */}
        <View className="absolute" style={{ top: essentialLabelPos.y - 10, left: essentialLabelPos.x - 15 }}>
          <Text className="text-white font-bold text-xs">
            {essentialPercent.toFixed(0)}%
          </Text>
        </View>

        <View className="absolute" style={{ top: discretionaryLabelPos.y - 10, left: discretionaryLabelPos.x - 15 }}>
          <Text className="text-white font-bold text-xs">
            {discretionaryPercent.toFixed(0)}%
          </Text>
        </View>

        <View className="absolute" style={{ top: savingsLabelPos.y - 10, left: savingsLabelPos.x - 15 }}>
          <Text className="text-white font-bold text-xs">
            {savingsPercent.toFixed(0)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const BudgetPieChartComparison = ({ 
  optimum = { essential: 50, discretionary: 30, savings: 20 },
  current = { essential: 60, discretionary: 25, savings: 15 }
}) => {
  const colors = {
    essential: '#EF4444',
    discretionary: '#F59E0B',
    savings: '#10B981',
  };

  return (
    <View className="p-5 bg-white rounded-2xl">
      {/* Two Pie Charts Side by Side */}
      <View className="flex-row justify-around mb-6">
        <SinglePieChart
          essential={optimum.essential}
          discretionary={optimum.discretionary}
          savings={optimum.savings}
          title="Optimum Budget"
        />
        
        <SinglePieChart
          essential={current.essential}
          discretionary={current.discretionary}
          savings={current.savings}
          title="Your Current Budget"
        />
      </View>

      {/* Legend - Shared for both charts */}
      <View className="flex-row flex-wrap justify-center gap-x-6 gap-y-3 px-4 pt-4 border-t border-gray-200">
        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: colors.essential }} />
          <Text className="text-sm font-medium text-gray-700">Essential</Text>
        </View>

        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: colors.discretionary }} />
          <Text className="text-sm font-medium text-gray-700">Discretionary</Text>
        </View>

        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: colors.savings }} />
          <Text className="text-sm font-medium text-gray-700">Savings</Text>
        </View>
      </View>
    </View>
  );
};

export default BudgetPieChartComparison;

// Usage Example:
