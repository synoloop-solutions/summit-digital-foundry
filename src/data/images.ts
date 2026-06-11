// Centralized Unsplash image URLs (sized via ?w= and ?auto=format).
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  heroHome: u("photo-1454165804606-c3d57bc86b40", 2000),
  heroAbout: u("photo-1521737711867-e3b97375f902", 1800),
  heroServices: u("photo-1551836022-d5d88e9218df", 1800),
  heroIndustries: u("photo-1486406146926-c627a92ad1ab", 1800),
  heroCases: u("photo-1573164713988-8665fc963095", 1800),
  heroTeam: u("photo-1522071820081-009f0129c71c", 1800),
  heroInsights: u("photo-1497366216548-37526070297c", 1800),
  heroCareers: u("photo-1497032628192-86f99bcd76bc", 1800),
  heroContact: u("photo-1517245386807-bb43f82c33c4", 1800),
  heroBook: u("photo-1556761175-5973dc0f32e7", 1800),
  heroProcess: u("photo-1551434678-e076c223a692", 1800),
  heroFaq: u("photo-1557804506-669a67965ba0", 1800),
  ctaPattern: u("photo-1450101499163-c8848c66ca85", 1800),
  mapImage: u("photo-1524661135-423995f22d0b", 1600),
  // Team avatars (varied portrait stock)
  avatar1: u("photo-1500648767791-00dcc994a43e", 600),
  avatar2: u("photo-1573497019940-1c28c88b4f3e", 600),
  avatar3: u("photo-1472099645785-5658abf4ff4e", 600),
  avatar4: u("photo-1580489944761-15a19d654956", 600),
  avatar5: u("photo-1519085360753-af0119f7cbe7", 600),
  avatar6: u("photo-1544005313-94ddf0286df2", 600),
  avatar7: u("photo-1507003211169-0a1dd7228f2d", 600),
  avatar8: u("photo-1487412720507-e7ab37603c6f", 600),
  // Insights
  insight1: u("photo-1460925895917-afdab827c52f", 1200),
  insight2: u("photo-1551288049-bebda4e38f71", 1200),
  insight3: u("photo-1556761175-b413da4baf72", 1200),
  insight4: u("photo-1542744173-8e7e53415bb0", 1200),
  insight5: u("photo-1454165804606-c3d57bc86b40", 1200),
  insight6: u("photo-1551836022-d5d88e9218df", 1200),
  // Case study covers
  case1: u("photo-1486406146926-c627a92ad1ab", 1400),
  case2: u("photo-1573164713988-8665fc963095", 1400),
  case3: u("photo-1517245386807-bb43f82c33c4", 1400),
  case4: u("photo-1581091226825-a6a2a5aee158", 1400),
  case5: u("photo-1556761175-5973dc0f32e7", 1400),
  case6: u("photo-1556761175-b413da4baf72", 1400),
};
