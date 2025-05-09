// Utility functions for chart data processing

/**
 * Formats large numbers for display (k for thousands, M for millions, B for billions)
 */
export const formatNumber = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

/**
 * Formats currency values with appropriate symbols
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  // For large numbers, format with the appropriate suffix
  if (value >= 1000000000) {
    return `${formatter.format(value / 1000000000)}B`;
  }
  if (value >= 1000000) {
    return `${formatter.format(value / 1000000)}M`;
  }
  if (value >= 1000) {
    return `${formatter.format(value / 1000)}k`;
  }
  
  return formatter.format(value);
};

/**
 * Extracts colors from the Salesforce dashboard JSON
 */
export const extractColorsFromPicklistColors = (picklistColors: Record<string, any>): string[] => {
  return Object.values(picklistColors).map(colorObj => `#${colorObj.color}`);
};

/**
 * Transforms Salesforce chart data to Recharts format
 */
export const transformSalesforceDataToRecharts = (factMap: Record<string, any>, groupings: any[]): any[] => {
  const result: any[] = [];
  
  // Process the groupings and factMap to format the data for Recharts
  groupings.forEach((group, index) => {
    const key = `${index}!T`;
    if (factMap[key]) {
      result.push({
        name: group.label,
        value: factMap[key].aggregates[0].value
      });
    }
  });
  
  return result;
};

/**
 * Generates a default color palette similar to Salesforce
 */
export const generateColorPalette = (count: number): string[] => {
  const baseColors = [
    '#0070d2', // Blue
    '#4bca81', // Green
    '#ffb75d', // Orange
    '#ba8ff7', // Purple
    '#54698d', // Slate
    '#e56798', // Pink
    '#1a9de5', // Light Blue
    '#13716c', // Teal
    '#ff5d2d', // Coral
    '#a173db'  // Violet
  ];
  
  const result: string[] = [];
  
  // If we need more colors than our base palette, we'll create variations
  for (let i = 0; i < count; i++) {
    const baseColor = baseColors[i % baseColors.length];
    if (i >= baseColors.length) {
      // Create a lighter version by parsing the hex color
      const r = parseInt(baseColor.slice(1, 3), 16);
      const g = parseInt(baseColor.slice(3, 5), 16);
      const b = parseInt(baseColor.slice(5, 7), 16);
      
      // Make it lighter by 25% for each cycle
      const lightenFactor = Math.floor(i / baseColors.length) * 0.25;
      const nr = Math.min(255, r + (255 - r) * lightenFactor);
      const ng = Math.min(255, g + (255 - g) * lightenFactor);
      const nb = Math.min(255, b + (255 - b) * lightenFactor);
      
      result.push(`#${Math.round(nr).toString(16).padStart(2, '0')}${Math.round(ng).toString(16).padStart(2, '0')}${Math.round(nb).toString(16).padStart(2, '0')}`);
    } else {
      result.push(baseColor);
    }
  }
  
  return result;
};
