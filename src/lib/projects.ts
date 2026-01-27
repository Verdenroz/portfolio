import { Project } from "@/types";
import { projectsData } from "@/config/projects";
import { skillCategories } from "@/config/skills";

/**
 * Converts a project title to a URL-safe slug
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Finds a project by its slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => createSlug(project.title) === slug);
}

function formatProjectMonthYear(dateStr: string): string {
  if (dateStr === "Present") return "Present";

  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;

  // Construct using local time to avoid timezone shifting the day.
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatProjectDateRange(date: string): string {
  if (date === "Present") return "Present";

  const [startRaw, endRaw] = date.split(" - ").map((p) => p.trim());
  if (!endRaw) return formatProjectMonthYear(startRaw);

  const startLabel = formatProjectMonthYear(startRaw);
  const endLabel = formatProjectMonthYear(endRaw);
  return `${startLabel} - ${endLabel}`;
}

export function getProjectStartDateISO(date: string): string {
  if (date === "Present") return new Date().toISOString().split("T")[0];
  const [startRaw] = date.split(" - ");
  const start = (startRaw ?? "").trim();
  // Best effort: if this isn't ISO, fall back to today.
  return /^\d{4}-\d{2}-\d{2}$/.test(start)
    ? start
    : new Date().toISOString().split("T")[0];
}

/**
 * Gets all project slugs for static generation
 */
export function getAllProjectSlugs(): string[] {
  return projectsData.map(project => createSlug(project.title));
}

/**
 * Gets the next and previous projects for navigation
 */
export function getAdjacentProjects(currentSlug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const currentIndex = projectsData.findIndex(
    project => createSlug(project.title) === currentSlug
  );
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prev = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const next = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
  
  return { prev, next };
}

/**
 * Maps project skill names to their corresponding icon URLs from the skills config
 */
export function getSkillIcon(skillName: string): string | null {
  // Create a flat map of all skills across categories
  const allSkills = skillCategories.flatMap(category => category.badges);
  
  // Find matching skill (case-insensitive)
  const matchedSkill = allSkills.find(skill => 
    skill.name.toLowerCase() === skillName.toLowerCase()
  );
  
  if (!matchedSkill) {
    return null;
  }
  
  // Return custom override if available, otherwise use Simple Icons CDN
  return matchedSkill.slugOverride || `https://cdn.simpleicons.org/${matchedSkill.slug}`;
}

/**
 * Gets icon URL with fallback handling
 */
export function getSkillIconSafe(skillName: string): string {
  const iconUrl = getSkillIcon(skillName);
  
  // Fallback to a default icon if no match found
  if (!iconUrl) {
    return `https://cdn.simpleicons.org/code/${skillName.toLowerCase().includes('java') ? 'F97316' : '666666'}`;
  }
  
  return iconUrl;
}

/**
 * Gets multiple fallback URLs for skill badges (with text) - for project carousel
 * Note: This always returns shields.io badges (icon + text), never raw image URLs
 */
export function getSkillBadgeWithFallback(skillName: string, skillSlug: string): string[] {
  const fallbacks: string[] = [];

  // Primary: shields.io with skill slug
  fallbacks.push(`https://img.shields.io/badge/${encodeURIComponent(skillName)}-333333?style=flat&logo=${skillSlug}`);

  // Secondary: Try simple icons from skills config
  const skillIcon = getSkillIcon(skillName);
  if (skillIcon) {
    // Convert simple icon to shields badge by extracting slug
    const simpleIconMatch = skillIcon.match(/simpleicons\.org\/([^/?]+)/);
    if (simpleIconMatch) {
      fallbacks.push(`https://img.shields.io/badge/${encodeURIComponent(skillName)}-333333?style=flat&logo=${simpleIconMatch[1]}`);
    }
  }

  // Tertiary: Generic shields.io fallback
  const genericSlug = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  fallbacks.push(`https://img.shields.io/badge/${encodeURIComponent(skillName)}-333333?style=flat&logo=${genericSlug}`);

  // Final fallback: shields.io without logo
  fallbacks.push(`https://img.shields.io/badge/${encodeURIComponent(skillName)}-333333?style=flat`);

  return fallbacks;
}

/**
 * Gets multiple fallback URLs for skill icons (icon only) - for project pages and skills
 */
export function getSkillIconWithFallback(skillName: string): string[] {
  const fallbacks: string[] = [];
  
  // Primary: Simple Icons from skills config
  const skillIcon = getSkillIcon(skillName);
  if (skillIcon) {
    fallbacks.push(skillIcon);
  }
  
  // Secondary: Try shields.io logo extraction (icon only)
  const allSkills = skillCategories.flatMap(category => category.badges);
  const matchedSkill = allSkills.find(skill => 
    skill.name.toLowerCase() === skillName.toLowerCase()
  );
  
  if (matchedSkill) {
    fallbacks.push(`https://cdn.simpleicons.org/${matchedSkill.slug}`);
  }
  
  // Tertiary: Generic simple icons fallback
  const genericSlug = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  fallbacks.push(`https://cdn.simpleicons.org/${genericSlug}`);
  
  // Final fallback: Default colored icon
  const color = skillName.toLowerCase().includes('java') ? 'F97316' : '666666';
  fallbacks.push(`https://cdn.simpleicons.org/code/${color}`);
  
  return fallbacks;
}