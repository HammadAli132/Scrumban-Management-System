// Generate a random color in dark theme palette
const generateDarkColor = () => {
    // Define a list of aesthetically pleasing dark theme colors
    const darkColors = [
      '#1E40AF', // deep blue
      '#4338CA', // indigo
      '#6D28D9', // violet
      '#7E22CE', // purple
      '#BE185D', // pink
      '#9D174D', // rose
      '#0E7490', // cyan
      '#065F46', // emerald
      '#166534', // green
      '#854D0E', // amber
      '#B45309', // orange
      '#92400E', // amber
      '#B91C1C', // red
    ];
    
    return darkColors[Math.floor(Math.random() * darkColors.length)];
  };
  
  // Generate initials from a string (usually name)
  const getInitials = (name) => {
    const parts = name.split(' ');
    
    if (parts.length === 1) {
      return name.substring(0, 2).toUpperCase();
    }
    
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };
  
  // Generate avatar data based on a name
  export const generateAvatar = (name) => {
    return {
      bgColor: generateDarkColor(),
      initials: getInitials(name),
    };
  };
  
  // Generate a seed-based random avatar (always same result for same seed)
  export const generateSeededAvatar = (seed) => {
    // Convert seed to a number if it's a string
    const numericSeed = typeof seed === 'string' 
      ? seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) 
      : seed;
    
    // Define a list of aesthetically pleasing dark theme colors
    const darkColors = [
      '#1E40AF', // deep blue
      '#4338CA', // indigo
      '#6D28D9', // violet
      '#7E22CE', // purple
      '#BE185D', // pink
      '#9D174D', // rose
      '#0E7490', // cyan
      '#065F46', // emerald
      '#166534', // green
      '#854D0E', // amber
      '#B45309', // orange
      '#92400E', // amber
      '#B91C1C', // red
    ];
    
    const colorIndex = numericSeed % darkColors.length;
    
    return {
      bgColor: darkColors[colorIndex],
      initials: typeof seed === 'string' ? getInitials(seed) : String(seed).substring(0, 2),
    };
  };