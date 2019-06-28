import "react-notifications-component/dist/theme.css";
export function showNotification(context,title,type,message) {
    return context.notificationDOMRef.current.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {duration: 2000},
        dismissable: {click: true}
    });
}