import Toast from "react-native-toast-message"
import { Alert } from "react-native"


const ToastMessage = (type, msg,duration=4000, goTo=()=>{}, show=()=>{}) => {
    // Toast.show({
    //     type: type,
    //     text1: type,
    //     text2: msg,
    //     visibilityTime: duration,
    //     position: 'center',
    //     onHide: () => goTo(),
    //     onShow: () => show()
    // })
    Alert.alert(type, msg)
}

export default ToastMessage