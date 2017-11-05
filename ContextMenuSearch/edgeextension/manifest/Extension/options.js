

  /*
  Update the options UI with the settings values retrieved from storage,
  or the default settings if the stored settings are empty.
  */
  function updateUI(restoredSettings) {
    console.log(restoreSettings);
  }
  
  function onError(e) {
    console.error(e);
  }
  
  const gettingStoredSettings = window.localStorage.getItem('data');
  gettingStoredSettings.then(updateUI, onError);
