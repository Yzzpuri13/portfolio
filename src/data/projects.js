export const projects = [
  {
    id: 1,
    title: "SAP GRC Automation Platform",
    description: "Built Delta's entire SAP GRC automation infrastructure from scratch â 50+ production bots handling compliance workflows.",
    category: "Automation",
    tags: ["UiPath", "SAP GRC", "REFramework", "Orchestrator"],
    image: "https://placehold.co/600x400/111/E50914?text=SAP+GRC",
    metrics: { hours: "2,000+", bots: "50+", reduction: "70%" }
  },
  {
    id: 2,
    title: "Invoice Document Processing",
    description: "Intelligent document processing system using UiPath Document Understanding and Azure AI for automated invoice extraction.",
    category: "AI/ML",
    tags: ["UiPath", "Document Understanding", "Azure AI", "Python"],
    image: "https://placehold.co/600x400/111/E50914?text=Doc+Processing",
    metrics: { accuracy: "95%", docs: "5,000+", time: "3min" }
  },
  {
    id: 3,
    title: "Content Classification Engine",
    description: "ML-powered content classification system for automated document routing and categorization across enterprise workflows.",
    category: "AI/ML",
    tags: ["Python", "Azure AI", "REST APIs", "SQL"],
    image: "https://placehold.co/600x400/111/E50914?text=ML+Engine",
    metrics: { accuracy: "92%", categories: "15+", speed: "< 1s" }
  },
  {
    id: 4,
    title: "Email Automation Bot",
    description: "Gmail/WhatsApp/Claude integration bot â monitors inbox, sends WhatsApp notifications, drafts AI-powered replies pending approval.",
    category: "Backend",
    tags: ["Python", "Node.js", "Gmail API", "Anthropic API"],
    image: "https://placehold.co/600x400/111/E50914?text=Email+Bot",
    metrics: { emails: "500+/day", response: "< 30s", uptime: "99.9%" }
  },
  {
    id: 5,
    title: "MockERP Multi-Tower Automation",
    description: "Full-stack Flask ERP system with HR, Time, and Access Control modules -- paired with UiPath REFramework Dispatcher/Performer for automated validation and exception handling.",
    category: "Automation",
    tags: ["Flask", "Python", "UiPath", "REFramework", "SQL"],
    image: "https://placehold.co/600x400/111/E50914?text=MockERP",
    metrics: { towers: "3", exceptions: "14+", uptime: "99%" },
    links: {
      live: "https://mock-erp-multi-tower-automation.vercel.app",
      github: "https://github.com/Yzzpuri13/MockERP-MultiTower-Automation"
    }
  }
];