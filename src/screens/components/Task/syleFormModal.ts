import {StyleSheet} from "react-native";

export const stylesTaskFormModal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1E25",
        justifyContent: "center",
        padding: 20,
    },
    fieldContainer: {
        marginBottom: 16,
        width: "100%",
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    label: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        backgroundColor: "#333333",
        color: "#FFF",
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
    },
    descriptionInput: {
        height: 120,
        textAlignVertical: "top",
    },
    charCount: {
        color: "#FFF",
        fontSize: 14,
        textAlign: "right",
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    timePickerText: {
        color: "#FFF",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#317bcf",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 16,
    },
    cancelButton: {
        backgroundColor: "#E23C44",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});
