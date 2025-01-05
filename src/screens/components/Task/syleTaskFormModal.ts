import {StyleSheet} from "react-native";

export const stylesTaskFormModal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1E25",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        width: "100%",
        backgroundColor: "#333333",
        color: "#FFF",
        borderRadius: 5,
        padding: 12,
        marginBottom: 16,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 16,
    },
    timePickerButton: {
        backgroundColor: "#333333",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 16,
        width: "100%",
    },
    saveButton: {
        backgroundColor: "#317bcf",
        padding: 12,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 16,
    },
    cancelButton: {
        backgroundColor: "#E23C44",
        padding: 12,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});
