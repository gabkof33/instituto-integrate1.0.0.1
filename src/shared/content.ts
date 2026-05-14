export interface ActionLink {
  label: string;
  href: string;
  icon?: string;
  name?: string;
}

export interface FeatureCard {
  card_icon: string;
  card_title: string;
  card_description: string;
}

export interface BenefitItem {
  benefit_icon: string;
  benefit_title: string;
  benefit_text: string;
}

export interface HighlightPoint {
  point_title: string;
  point_description: string;
  cta_button: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ValueCard {
  value_title: string;
  value_description: string;
}

export interface TeamMember {
  role: string;
  name: string;
  image: string;
  image_position?: string;
  image_fit?: "cover" | "contain";
  qualifications: string[];
}

export interface HeroContent {
  heading_primary: string;
  heading_secondary: string;
  cta_button_primary: string;
  cta_button_secondary: string;
  background_image: string;
  background_video: string;
}

export interface AboutContent {
  section_title: string;
  section_description: string;
  feature_cards: FeatureCard[];
}

export interface BenefitsContent {
  section_title: string;
  section_subtitle: string;
  benefits_grid: BenefitItem[];
}

export interface TransformationContent {
  section_title: string;
  section_text_block: string;
  highlight_points: HighlightPoint[];
}

export interface InstituteContent {
  section_title: string;
  image_profile: string;
  text_block: string;
  timeline: TimelineItem[];
}

export interface ProgramItem {
  title: string;
  tagline: string;
  summary: string;
  image?: string;
}

export interface ProgramsContent {
  section_title: string;
  section_subtitle: string;
  items: ProgramItem[];
}

export interface MissionBlock {
  title: string;
  description: string;
}

export interface MissionVisionValuesContent {
  mission_block: MissionBlock;
  vision_block: MissionBlock;
  values_cards: ValueCard[];
}

export interface TeamContent {
  section_title: string;
  section_subtitle: string;
  members: TeamMember[];
}

export interface ContactContent {
  section_title: string;
  section_subtitle: string;
  input_name: string;
  input_email: string;
  input_phone: string;
  textarea_message: string;
  submit_button: string;
}

export interface CtaContent {
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;
}

export interface HourItem {
  day: string;
  times: string;
  closed: boolean;
}

export interface LocationContent {
  address: string;
  phone: string;
  hours: HourItem[];
  latitude?: number;
  longitude?: number;
}

export interface FooterContent {
  logo: string;
  brand_subtitle: string;
  navigation_links: ActionLink[];
  social_links: ActionLink[];
  contact_info: string;
  copyright_text: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  benefits: BenefitsContent;
  transformation: TransformationContent;
  institute: InstituteContent;
  programs: ProgramsContent;
  missionVisionValues: MissionVisionValuesContent;
  team: TeamContent;
  contact: ContactContent;
  cta: CtaContent;
  location: LocationContent;
  footer: FooterContent;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactSubmission extends ContactPayload {
  id: string;
  createdAt: string;
}
