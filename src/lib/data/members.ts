export interface Mercenary {
  name: string;
  title: string;
  link?: string;
  imagePath: string;
  roleIcon?: string;
}

function shuffleArray(array: Mercenary[]) {
  const arr = [...array]; // create a shallow copy so we don't mutate the original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

export const mercenaries: Mercenary[] = [
  {
    name: "Suede",
    title: "UI/UX Designer",
    link: "https://linktr.ee/suede0619",
    imagePath: "/images/member-suede.png",
    roleIcon: "/images/icon-og-cartelculture.svg",
  },
  {
    name: "Sero",
    title: "FrontEnd Dev",
    link: "https://github.com/0xSero",
    imagePath: "/images/member-sero.png",
    roleIcon: "/images/icon-og-community.svg",
  },
  {
    name: "Daopunk",
    title: "Smart Contracts",
    link: "https://github.com/daopunk",
    imagePath: "/images/member-daopunk.png",
    roleIcon: "/images/icon-og-consultations.svg",
  },
  {
    name: "MrDeadce11",
    title: "Smart Contracts",
    link: "https://github.com/MrDeadCe11",
    imagePath: "/images/member-mrdeadce11.png",
    roleIcon: "/images/icon-og-daodesign.svg",
  },
  {
    name: "TheBeyondr",
    title: "FrontEnd Dev",
    link: "https://github.com/thebeyondr",
    imagePath: "/images/member-thebeyondr.png",
    roleIcon: "/images/icon-og-designsprints.svg",
  },
  {
    name: "ECWireless",
    title: "Project Manager",
    link: "https://github.com/ECWireless",
    imagePath: "/images/member-ecwireless.png",
    roleIcon: "/images/icon-og-education.svg",
  },
  {
    name: "Suns",
    title: "Frontend Dev",
    link: "https://github.com/sunsakis",
    imagePath: "/images/member-suns.png",
    roleIcon: "/images/icon-og-experimentation.svg",
  },
  {
    name: "Cupojoseph",
    title: "Smart Contracts",
    link: "https://x.com/CupOJoseph",
    imagePath: "/images/member-cupojoseph.png",
    roleIcon: "/images/icon-og-frontenddev.svg",
  },
  {
    name: "Benedictus",
    title: "Project Manager",
    link: "https://github.com/b3nedictvs",
    imagePath: "/images/member-benedictvs.png",
    roleIcon: "/images/icon-og-fullstackdev.svg",
  },
  {
    name: "Sasquatch",
    title: "BizDev",
    imagePath: "/images/member-sasquatch.png",
    roleIcon: "/images/icon-og-learningnewthings.svg",
  },
  {
    name: "Sayonara",
    title: "Frontend Dev",
    link: "https://github.com/wtfsayo",
    imagePath: "/images/member-sayonara.png",
    roleIcon: "/images/icon-og-manifesto.svg",
  },
  {
    name: "Scottrepreneur",
    title: "Internal Ops",
    link: "https://scottrepreneur.eth.limo/",
    imagePath: "/images/member-scottrepreneur.png",
    roleIcon: "/images/icon-og-marketing.svg",
  },
  {
    name: "Vika",
    title: "UX/UI Designer",
    link: "https://open.spotify.com/user/vvicos",
    imagePath: "/images/member-vika.png",
    roleIcon: "/images/icon-og-marketingdesign.svg",
  },
  {
    name: "E2T",
    title: "DAO Consultant",
    link: "https://github.com/earth2travis",
    imagePath: "/images/member-e2t.png",
    roleIcon: "/images/icon-og-raidguild.svg",
  },
  {
    name: "Pupcakes",
    title: "FullStack Dev",
    link: "https://github.com/Fluffy9",
    imagePath: "/images/member-pupcakes.png",
    roleIcon: "/images/icon-og-learningnewthings.svg",
  },
  {
    name: "Skuhl",
    title: "FullStack Dev",
    imagePath: "/images/member-samkuhlman.png",
    roleIcon: "/images/icon-og-education.svg",
  },
  {
    name: "Georgeh",
    title: "FullStack Dev",
    imagePath: "/images/member-georgeh.png",
    roleIcon: "/images/icon-og-tipofthespear.svg",
  },
  {
    name: "Jip",
    title: "FrontEnd Dev",
    imagePath: "/images/member-jip.png",
    roleIcon: "/images/icon-og-cartelculture.svg",
  },
  {
    name: "Mehrdad",
    title: "BizDev",
    link: "https://x.com/0xcr33pt0",
    imagePath: "/images/member-mehrdad.png",
    roleIcon: "/images/icon-og-community.svg",
  },
  {
    name: "Elco",
    title: "BizDev",
    imagePath: "/images/member-elco.png",
    roleIcon: "/images/icon-og-consultations.svg",
  },
  {
    name: "Vid",
    title: "Summoner",
    imagePath: "/images/member-vid.png",
    roleIcon: "/images/icon-og-daodesign.svg",
  },
  {
    name: "Chiali",
    title: "UX/UI Designer",
    link: "https://x.com/Chia_Tea",
    imagePath: "/images/member-chiali.png",
    roleIcon: "/images/icon-og-designsprints.svg",
  },
  {
    name: "Ven",
    title: "Summoner",
    imagePath: "/images/member-ven.png",
    roleIcon: "/images/icon-og-education.svg",
  },
  {
    name: "Bitbeckers",
    title: "FullStack Dev",
    imagePath: "/images/member-bitbeckers.png",
    roleIcon: "/images/icon-og-experimentation.svg",
  },
];

export const shuffledMercenaries = shuffleArray(mercenaries);
