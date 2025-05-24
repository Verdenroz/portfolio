"use client";

import React, { useRef, useEffect, useState } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";

/**
 * Interface representing a work experience entry
 */
interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  timeframe: string;
  startDate: Date;
  endDate: Date | null; // null for current positions
  description: string;
  achievements: string[];
  technologies: string[];
  type: "internship" | "freelance" | "full-time" | "part-time" | "volunteer";
  experienceGroup?: string; // Group category for current experiences (e.g., "Full Stack Development")
}

/**
 * Interface for tree node data structure used in the visualization
 */
interface TreeNodeDatum {
  name: string;
  attributes: {
    company: string;
    timeframe: string;
    description: string;
    technologies?: string;
    achievements?: string;
    location?: string;
    type?: string;
    [key: string]: any;
  };
  children?: TreeNodeDatum[];
}

// Work experiences data - easily extendable
const experiences: Experience[] = [
  {
    id: "klover-2025",
    company: "Klover",
    position: "Software Engineer Intern",
    location: "Remote",
    timeframe: "March 2025 – Present",
    startDate: new Date(2025, 2), // March 2025
    endDate: null,
    description:
      "Develop and maintain open source agentic AI software in the fields of finance and talent acquisition.",
    achievements: [
      "Automated hiring and code judging processes for future interns",
      "Created multi-agent system for real-time financial data and sentiment analysis",
    ],
    technologies: ["Python", "AI", "OpenAI API", "Selenium"],
    type: "internship",
    experienceGroup: "AI Development",
  },
  {
    id: "freelance-kevin-2025",
    company: "Kevin Schoovaerts",
    position: "Freelance Full-stack Developer",
    location: "Remote",
    timeframe: "March 2025 – Present",
    startDate: new Date(2025, 2), // March 2025
    endDate: null,
    description:
      "Created personal portfolio website for stock trader, polling real-time data and setting up Stripe payment/paywall for client's current paying Substack subscribers.",
    achievements: [
      "Gathered requirements with weekly meetings and daily messages",
      "Implemented agile development methodology",
      "Integrated real-time data polling system",
      "Set up Stripe payment gateway for subscription management",
    ],
    technologies: ["React", "Next.js", "Stripe", "Real-time APIs", "Agile"],
    type: "freelance",
    experienceGroup: "Full Stack Development",
  },
  {
    id: "commons-xr-2024",
    company: "The Commons XR",
    position: "Full-Stack Developer Intern",
    location: "Remote",
    timeframe: "September 2024 – January 2025",
    startDate: new Date(2024, 8), // September 2024
    endDate: new Date(2025, 0), // January 2025
    description:
      "Enhanced application interface by implementing interactive UI components using MUI in a React-based project.",
    achievements: [
      "Architectured data flow pipelines for user analytics",
      "Led migration from PowerBI to React-based charts",
      "Enhanced user interactions through custom UI components",
      "Improved application performance and user experience",
    ],
    technologies: [
      "React",
      "Material-UI",
      "PowerBI",
      "Data Analytics",
      "UI/UX",
    ],
    type: "internship",
    experienceGroup: "Full Stack Development",
  },
  {
    id: "headstarter-2024",
    company: "Headstarter",
    position: "Software Engineering Fellow",
    location: "Remote",
    timeframe: "June 2024 – September 2024",
    startDate: new Date(2024, 5), // June 2024
    endDate: new Date(2024, 8), // September 2024
    description:
      "Fellowship program focused on building a full-stack web application using React, Next.js, and AI.",
    achievements: ["Finalist in 2 hiring hackathons"],
    technologies: ["React", "Next.js", "AI"],
    type: "internship",
    experienceGroup: "AI Development",
  },
  {
    id: "mobalytics-2024",
    company: "Extern",
    position: "Mobalytics Remote Extern",
    location: "Remote",
    timeframe: "May 2024 – June 2024",
    startDate: new Date(2024, 4), // May 2024
    endDate: new Date(2024, 5), // June 2024
    description:
      "Delivered competitive market insights, emerging as 1 of 4 final presenters from a 412-member cohort.",
    achievements: [
      "Selected as top 4 presenter from 412-member cohort",
      "Identified strategic growth opportunities in gaming industry",
      "Conducted thorough competitive market research",
      "Presented findings to executive leadership",
    ],
    technologies: [
      "Market Research",
      "Data Analysis",
      "Competitive Analysis",
      "Strategic Planning",
    ],
    type: "internship",
  },
  {
    id: "coachart-2023",
    company: "CoachArt",
    position: "Coding Coach",
    location: "Remote",
    timeframe: "November 2022 - February 2023",
    startDate: new Date(2022, 10), // November 2022
    endDate: new Date(2023, 1), // February 2023
    description:
      "Taught Python programming and game development to children with chronic illnesses, fostering a supportive learning environment.",
    achievements: [
      "Developed engaging lesson plans for children",
      "Fostered a supportive and inclusive learning environment",
      "Encouraged creativity and problem-solving skills",
      "Mentored students in their coding journey",
    ],
    technologies: ["Python", "Game Development", "Teaching", "Mentoring"],
    type: "volunteer",
    experienceGroup: "Full Stack Development",
  },
  {
    id: "macys-2022",
    company: "Macy's",
    position: "Sales Associate",
    location: "New York, NY",
    timeframe: "June 2022 - September 2023",
    startDate: new Date(2022, 5), // June 2022
    endDate: new Date(2023, 8), // September 2023
    description:
      "Provided exceptional customer service and assisted in sales operations, contributing to a positive shopping experience.",
    achievements: [
      "Received positive customer feedback for service excellence",
      "Trained new employees on sales techniques and customer service",
    ],
    technologies: ["Customer Service", "Sales", "Teamwork"],
    type: "part-time",
  },
];

/**
 * Helper function to get year from date
 */
const getYear = (date: Date): number => date.getFullYear();

/**
 * Helper function to create an experience node for the tree
 */
const createExperienceNode = (exp: Experience): TreeNodeDatum => ({
  name: exp.position,
  attributes: {
    company: exp.company,
    timeframe: exp.timeframe,
    description: exp.description,
    technologies: exp.technologies.join(", "),
    achievements: exp.achievements.join("\n• "),
    location: exp.location,
    type: exp.type,
  },
  children: [],
});

/**
 * Transforms experience data into tree structure for visualization
 */
const createTimelineTree = (experiences: Experience[]): TreeNodeDatum => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

  // Separate current and past experiences
  const currentExperiences = sortedExperiences.filter(
    (exp) => exp.endDate === null
  );
  const pastExperiences = sortedExperiences.filter(
    (exp) => exp.endDate !== null
  );

  // Find earliest year for the timeframe
  const years = sortedExperiences.map((exp) => getYear(exp.startDate));
  const earliestYear = Math.min(...years);

  // Create the root node (profile)
  const rootNode: TreeNodeDatum = {
    name: "Harvey Tseng",
    attributes: {
      company: "Software Engineer & Developer",
      timeframe: `${earliestYear} - Present`,
      description:
        "Full-stack developer with expertise in React, Python, and mobile development. Currently pursuing BS in Computer Programming & Information Systems (GPA: 3.98).",
      type: "profile",
    },
    children: [],
  };

  // Group current experiences by experienceGroup
  if (currentExperiences.length > 1) {
    // Group by experienceGroup
    const currentGroups = currentExperiences.reduce<
      Record<string, Experience[]>
    >((acc, exp) => {
      const techGroup = exp.experienceGroup || "General";
      if (!acc[techGroup]) {
        acc[techGroup] = [];
      }
      acc[techGroup].push(exp);
      return acc;
    }, {});

    // Create group nodes for each tech group
    Object.entries(currentGroups).forEach(([techGroup, exps]) => {
      const groupNode: TreeNodeDatum = {
        name: `${techGroup}`,
        attributes: {
          company: `${exps.length} active position${
            exps.length > 1 ? "s" : ""
          }`,
          timeframe: "Present",
          description: "",
          type: "tech-group",
        },
        children: exps.map(createExperienceNode),
      };

      rootNode.children!.push(groupNode);
    });
  } else if (currentExperiences.length === 1) {
    // If only one current experience, add it directly
    rootNode.children!.push(createExperienceNode(currentExperiences[0]));
  }

  // Group past experiences by their experience group
  const pastGroupedByExperience = pastExperiences.reduce<
    Record<string, Experience[]>
  >((acc, exp) => {
    const group = exp.experienceGroup || "Other Experience";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(exp);
    return acc;
  }, {});

  // Map current experiences to related past experiences with the same group
  const techOverlaps: Record<string, Experience[]> = {};
  if (currentExperiences.length > 0) {
    currentExperiences.forEach((currentExp) => {
      const currentGroup = currentExp.experienceGroup || "General";
      const matchingPastExps = pastGroupedByExperience[currentGroup] || [];

      if (matchingPastExps.length > 0) {
        techOverlaps[currentExp.id] = [...matchingPastExps];
      }
    });
  }

  // Track linked past experiences to avoid duplication
  const linkedPastExpIds = new Set<string>();

  // Link past experiences to their related current experiences
  if (currentExperiences.length > 0) {
    rootNode.children!.forEach((node) => {
      if (node.attributes.type === "tech-group" && node.children) {
        // Handle tech group nodes (with multiple current experiences)
        node.children.forEach((expNode) => {
          const currentExp = currentExperiences.find(
            (e) => e.position === expNode.name
          );

          if (currentExp && techOverlaps[currentExp.id]) {
            if (!expNode.children) expNode.children = [];

            // Add related past experiences to this current experience
            techOverlaps[currentExp.id].forEach((pastExp) => {
              linkedPastExpIds.add(pastExp.id);
              expNode.children!.push(createExperienceNode(pastExp));
            });
          }
        });
      } else if (node.attributes.type !== "profile") {
        // Handle direct current experience nodes
        const currentExp = currentExperiences.find(
          (e) => e.position === node.name
        );

        if (currentExp && techOverlaps[currentExp.id]) {
          if (!node.children) node.children = [];

          // Add related past experiences to this current experience
          techOverlaps[currentExp.id].forEach((pastExp) => {
            linkedPastExpIds.add(pastExp.id);
            node.children!.push(createExperienceNode(pastExp));
          });
        }
      }
    });
  }

  // Add remaining unlinked past experiences
  const unlinkedPastExps = pastExperiences.filter(
    (exp) => !linkedPastExpIds.has(exp.id)
  );

  if (unlinkedPastExps.length > 0) {
    // Group unlinked experiences by their experienceGroup
    const pastGroups = unlinkedPastExps.reduce<Record<string, Experience[]>>(
      (acc, exp) => {
        const group = exp.experienceGroup || "Other";
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(exp);
        return acc;
      },
      {}
    );

    // Create a group node for each experience group
    Object.entries(pastGroups).forEach(([groupName, exps]) => {
      // Sort experiences by date (most recent first)
      const sortedGroupExps = [...exps].sort(
        (a, b) => b.startDate.getTime() - a.startDate.getTime()
      );

      // Create group node
      const groupNode: TreeNodeDatum = {
        name: `${groupName}`,
        attributes: {
          company: "Previous Roles",
          timeframe: "Past experiences",
          description: "",
          type: "tech-group",
        },
        children: sortedGroupExps.map(createExperienceNode),
      };

      rootNode.children!.push(groupNode);
    });
  }

  return rootNode;
};

/**
 * Node styling configuration by node type
 */
const NODE_STYLES = {
  profile: {
    width: 400,
    height: 200,
    bgClass: "bg-blue-800 text-white border-blue-900",
    textSize: "text-lg",
  },
  techGroup: {
    width: 280,
    height: 120,
    bgClass: "bg-green-700 text-white border-green-800",
    textSize: "text-base",
  },
  experience: {
    width: 360,
    height: 320,
    bgClass: "bg-white border-gray-200",
    textSize: "text-sm",
  },
};

/**
 * Type color mapping for experience types
 */
const TYPE_COLORS = {
  freelance: "bg-purple-100 text-purple-800",
  internship: "bg-blue-100 text-blue-800",
  "full-time": "bg-green-100 text-green-800",
  "part-time": "bg-yellow-100 text-yellow-800",
  volunteer: "bg-pink-100 text-pink-800",
  contract: "bg-orange-100 text-orange-800",
};

/**
 * Renders a custom tree node for experience visualization
 */
const renderNode = ({
  nodeDatum,
  toggleNode,
}: {
  nodeDatum: RawNodeDatum;
  toggleNode: () => void;
}) => {
  const node = nodeDatum as unknown as TreeNodeDatum;

  // Determine node type
  const isProfileNode = node.attributes.type === "profile";
  const isTechGroupNode = node.attributes.type === "tech-group";
  const isExperienceNode = !isProfileNode && !isTechGroupNode;

  // Get styling based on node type
  const styling = isProfileNode
    ? NODE_STYLES.profile
    : isTechGroupNode
    ? NODE_STYLES.techGroup
    : NODE_STYLES.experience;

  // Get experience type color for badges
  const getTypeColor = (type: string) =>
    TYPE_COLORS[type as keyof typeof TYPE_COLORS] ||
    "bg-gray-100 text-gray-800";

  // Check if node has children for collapsible behavior
  const hasChildren = node.children && node.children.length > 0;

  // Split technologies for display
  const technologies = node.attributes.technologies?.split(", ") || [];

  return (
    <g>
      {/* Collapse/Expand circle indicator for nodes with children */}
      {hasChildren && (
        <circle
          r={12}
          fill="#3b82f6"
          stroke="#1d4ed8"
          strokeWidth={2}
          onClick={toggleNode}
          style={{ cursor: "pointer" }}
          className="hover:fill-blue-400"
        />
      )}

      {/* Node content */}
      <foreignObject
        width={styling.width}
        height={styling.height}
        x={-styling.width / 2}
        y={-styling.height / 2}
      >
        <div
          className={`border rounded-lg shadow-lg p-4 ${
            styling.bgClass
          } h-full overflow-hidden ${
            hasChildren ? "cursor-pointer hover:opacity-95" : ""
          }`}
          onClick={hasChildren ? toggleNode : undefined}
        >
          {/* Header with title and type badge */}
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-semibold ${styling.textSize} flex-1 mr-2`}>
              {node.name}
            </h3>

            {isExperienceNode && node.attributes.type && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeColor(
                  node.attributes.type
                )}`}
              >
                {node.attributes.type}
              </span>
            )}

            {/* Expand/collapse button */}
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode();
                }}
                className={`ml-2 text-xs px-2 py-1 rounded ${
                  isProfileNode || isTechGroupNode
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {(nodeDatum as any).__rd3t?.collapsed ? "+" : "−"}
              </button>
            )}
          </div>
          {/* Company name */}
          <p
            className={`font-medium mb-1 ${
              isProfileNode || isTechGroupNode ? "text-white" : "text-blue-700"
            } text-sm`}
          >
            {node.attributes.company}
          </p>
          {/* Timeframe and location */}
          <div className="flex justify-between items-center mb-2">
            <p
              className={`${
                isProfileNode || isTechGroupNode
                  ? "text-white"
                  : "text-gray-500"
              } text-xs`}
            >
              {node.attributes.timeframe}
            </p>
            {isExperienceNode && node.attributes.location && (
              <p className="text-gray-500 text-xs">
                📍 {node.attributes.location}
              </p>
            )}
          </div>
          {/* Description */}
          <p
            className={`mb-3 leading-relaxed ${
              isProfileNode || isTechGroupNode ? "text-white" : "text-gray-700"
            } text-xs line-clamp-3`}
          >
            {node.attributes.description}
          </p>
          {/* Achievements (if any) */}
          {node.attributes.achievements && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-600 mb-1">
                Key Achievements:
              </p>
              <div className="text-xs text-gray-700 leading-relaxed max-h-20 overflow-y-auto">
                {node.attributes.achievements
                  .split("\n")
                  .map((achievement, i) => (
                    <div key={i} className="mb-1">
                      {achievement.startsWith("• ")
                        ? achievement
                        : `• ${achievement}`}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {/* Technologies tags */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {" "}
              {technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-full text-xs ${
                    isProfileNode || isTechGroupNode
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                  +{technologies.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </foreignObject>
    </g>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeInitialized, setTreeInitialized] = useState(false);
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const newTranslate = { x: width / 2, y: 100 };
        setTranslate(newTranslate);
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Force a reset after a short delay to ensure tree initialization
    const initTimer = setTimeout(() => {
      setTreeInitialized(true);
    }, 500);

    // Update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(initTimer);
    };
  }, []);

  const treeData = createTimelineTree(experiences);

  return (
    <section id="experience" className="py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Work Experience Timeline
        </h2>{" "}
        <div className="mb-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Click nodes to expand/collapse • Drag to pan • Scroll to zoom
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Showing {experiences.length} work experiences across{" "}
            {new Set(experiences.map((e) => getYear(e.startDate))).size} years
          </p>
        </div>
        <div
          ref={containerRef}
          style={{ width: "100%", touchAction: "none", position: "relative" }}
          className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
        >
          {!treeInitialized && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-r-transparent mb-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Loading visualization...
                </span>
              </div>
            </div>
          )}
          <Tree
            data={treeData}
            orientation="vertical"
            translate={translate}
            renderCustomNodeElement={renderNode}
            collapsible={true}
            pathFunc="step"
            nodeSize={{ x: 420, y: 450 }}
            separation={{ siblings: 1.5, nonSiblings: 2.0 }}
            zoomable={true}
            draggable={true}
            scaleExtent={{ min: 0.5, max: 1.1 }}
            zoom={0.8}
            enableLegacyTransitions={false}
            key={`tree-${treeInitialized}`} // Force re-render on init
            pathClassFunc={() =>
              "stroke-gray-400 dark:stroke-gray-600 stroke-2 fill-none"
            }
            initialDepth={1}
          />
        </div>
      </div>
    </section>
  );
}
