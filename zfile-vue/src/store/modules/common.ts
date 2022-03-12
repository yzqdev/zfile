interface ICommonState {
  config: any;
  currentStorageStrategy: any;
  currentDirectory: any;
  imgMode: boolean;
  newImgMode: boolean;
  oldDriveId: any;
}

const state: ICommonState = {
  config: {},
  currentStorageStrategy: null,
  currentDirectory: null,
  imgMode: false,
  newImgMode: false,
  oldDriveId: null,
};

const mutations = {
  updateOldDriveId(state: ICommonState, v) {
    state.oldDriveId = v;
  },
  updateNewImgMode(state: ICommonState, v) {
    state.newImgMode = v;
  },
  updateConfig(state: ICommonState, v) {
    state.config = v;
  },
  currentDirectory(state: ICommonState, v) {
    state.currentDirectory = v;
  },
  hoverRow(state: ICommonState, v) {
    state.hoverRow = v;
  },
  rightClickRow(state: ICommonState, v) {
    state.rightClickRow = v;
  },
  updateSearchParam(state: ICommonState, v) {
    state.searchParam = v;
  },
  updateCurrentStorageStrategy(state: ICommonState, v) {
    state.currentStorageStrategy = v;
  },
  switchImgMode(state: ICommonState, v) {
    state.imgMode = v;
  },
};

const getters = {
  directLinkPrefix: (state) => {
    return state.config && state.config.directLinkPrefix;
  },
  oldDriveId: (state) => {
    return state.oldDriveId;
  },
  newImgMode: (state) => {
    return state.newImgMode === true;
  },
  defaultSwitchToImgMode: (state) => {
    return state.config && state.config.defaultSwitchToImgMode;
  },
  imgMode: (state) => {
    return state.imgMode;
  },
  infoEnable: (state) => {
    return state.config && state.config.infoEnable;
  },
  showLinkBtn: (state) => {
    return state.config && state.config.showLinkBtn;
  },
  showShortLink: (state) => {
    return state.config && state.config.showShortLink;
  },
  showPathLink: (state) => {
    return state.config && state.config.showPathLink;
  },
  tableSize: (state: ICommonState) => {
    return state.config && state.config.tableSize;
  },
  currentStorageStrategyType: (state) => {
    return state.currentStorageStrategy.type.key;
  },
  currentStorageStrategyId: (state) => {
    return state.currentStorageStrategy.id;
  },
  showOperator: (state) => {
    return state.config && state.config.showOperator;
  },
  showDocument: (state) => {
    return state.config && state.config.showDocument;
  },
  debugMode: (state) => {
    return state.config && state.config.debugMode;
  },
  domain: (state) => {
    return state.config && state.config.domain;
  },
  announcement: (state) => {
    return state.config && state.config.announcement;
  },
  layout: (state) => {
    return state.config && state.config.layout;
  },
  showAnnouncement: (state) => {
    return state.config && state.config.showAnnouncement;
  },
  searchEnable: (state) => {
    return state.config && state.config.searchEnable;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,

  getters,
  mutations,
  actions,
};
