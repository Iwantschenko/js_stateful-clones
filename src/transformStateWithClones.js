'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function cloneObj(obj) {
  return { ...obj };
}

function addToObj(obj, mods) {
  return Object.assign(cloneObj(obj), mods);
}

function removeFromObj(obj, mods) {
  const clone = cloneObj(obj);

  for (const key of mods) {
    delete clone[key];
  }

  return clone;
}

function clearObj(state) {
  return {};
}

function transformStateWithClones(state = {}, actions) {
  const stateHistory = [state];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory.push(
          addToObj(stateHistory[stateHistory.length - 1], action.extraData),
        );
        break;
      case 'removeProperties':
        stateHistory.push(
          removeFromObj(
            stateHistory[stateHistory.length - 1],
            action.keysToRemove,
          ),
        );
        break;
      case 'clear':
        stateHistory.push(clearObj(stateHistory[stateHistory.length - 1]));
        break;
    }
  }

  return stateHistory.slice(1);
}

module.exports = transformStateWithClones;
