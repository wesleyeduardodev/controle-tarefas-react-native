import {StyleSheet} from "react-native";

export const stylesTaskFormModal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1E25",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    timePickerText: {
        color: "#FFF",
        fontSize: 16,
    },
    label: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 8,
        textAlign: "left",
        fontWeight: "bold",
    },
    charCount: {
        color: "#FFF",
        fontSize: 14,
        textAlign: "right",
        marginBottom: 15,
    },

    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    descriptionInput: {
        height: 120, // Aumenta a altura para comportar textos maiores
        textAlignVertical: "top", // Garante que o texto comece na parte superior
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
