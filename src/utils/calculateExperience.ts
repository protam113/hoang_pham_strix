/**
 * Calculate years of experience from a start date
 * @param startYear - Year started working
 * @param startMonth - Month started working (1-12)
 * @returns Formatted experience string (e.g., "1.5", "2", "2.5")
 */
export function calculateExperience(
  startYear: number,
  startMonth: number
): string {
  const now = new Date();
  const start = new Date(startYear, startMonth - 1); // Month is 0-indexed

  const diffInMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  const years = diffInMonths / 12;

  // Round to nearest 0.5
  const rounded = Math.round(years * 2) / 2;

  // Format: show decimal only if not a whole number
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
}
