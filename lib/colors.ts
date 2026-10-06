/** WCAG relative luminance, for readable text on each product's accent color. */
export function contrastText(hex: string): "#05070d" | "#ffffff" {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return "#05070d";
  const channels = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255).map(v => v <= 0.04045 ? v/12.92 : ((v+0.055)/1.055)**2.4);
  const luminance = channels[0]*0.2126 + channels[1]*0.7152 + channels[2]*0.0722;
  return luminance > 0.179 ? "#05070d" : "#ffffff";
}
