
const initialState = {
    SettingData : []
}

const SettingsApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "SETTINGS_DATA":
            return {...state, SettingData : action.payload}
        default:
           return state;
    }
}

export default SettingsApi;