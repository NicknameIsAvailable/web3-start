const host = typeof window !== 'undefined' ? window.location.host : 'defaultHost';

export const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: 'Next-Metamask-Boilerplate',
    url: host
  }
};
