import { Option } from "@/components/ui/multiselect";

export const CONTACT_CHANNEL_OPTIONS: Option[] = [
  { label: "Discord", value: "DISCORD" },
  { label: "Telegram", value: "TELEGRAM" },
];

export const BUDGET_OPTIONS: Option[] = [
  { label: "< $5k", value: "LESS_THAN_FIVE_THOUSAND" },
  { label: "$5k - $20k", value: "FIVE_TO_TWENTY_THOUSAND" },
  { label: "$20k - $50k", value: "TWENTY_TO_FIFTY_THOUSAND" },
  { label: "$50k +", value: "MORE_THAN_FIFTY_THOUSAND" },
  { label: "Not Sure", value: "NOT_SURE" },
];

export const TIMELINE_OPTIONS: Option[] = [
  { label: "1-3 months", value: "1-3months" },
  { label: "3-6 months", value: "3-6 months" },
  { label: "6+ months", value: "6+ months" },
];

export const PROJECT_PRIORITY_OPTIONS: Option[] = [
  { label: "Fast & Polished", value: "FAST_AND_POLISHED" },
  { label: "Fast & Inexpensive", value: "FAST_AND_INEXPENSIVE" },
  { label: "Polished & Inexpensive", value: "POLISHED_AND_INEXPENSIVE" },
];

export const SERVICES_OPTIONS: Option[] = [
  { label: "Development", value: "DEVELOPMENT" },
  { label: "Marketing & Content Strategy", value: "MARKETING" },
  { label: "DAO & Governance Consulting", value: "DAO" },
  { label: "Product & System Design", value: "UX" },
];
