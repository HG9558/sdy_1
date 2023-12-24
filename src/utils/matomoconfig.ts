type MatomoConfigsType = {
  [key: string]: {
    host: string;
    siteId: {
      PC: number;
      WAP: number;
      APP: number;
    };
  };
};

const matomoconfigs: MatomoConfigsType = {
  bog: {
    host: 'https://presdy.matomo.cloud/',
    siteId: {
      PC: 27,
      WAP: 26,
      APP: 45,
    },
  },
}

export default (site: keyof MatomoConfigsType) => matomoconfigs[site]
