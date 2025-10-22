import Toast from "react-native-toast-message"



const ToastMessage = (type, msg,duration=1000, goTo=()=>{}, show=()=>{}) => {
    Toast.show({
        type: type,
        text1: type,
        text2: msg,
        visibilityTime: duration,
        position: 'top',
        onHide: () => goTo(),
        onShow: () => show()
    })
}

export default ToastMessage