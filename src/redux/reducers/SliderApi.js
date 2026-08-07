
const initialState = {
    SliderData : []
}

const SliderApi = (state = initialState, action ) => {
    
    switch (action.type) {
        case "SLIDER_DATA":
            return {...state, SliderData : action.payload}
        default:
           return state;
    }
}

export default SliderApi;