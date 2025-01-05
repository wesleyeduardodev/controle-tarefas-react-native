import { StyleSheet } from "react-native";

export const stylesTask = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#1F1E25",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
    },
    containerCompleted: {
        backgroundColor: "#333333",
    },
    checkboxContainer: {
        marginRight: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#4EA8DE",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        backgroundColor: "#5E60CE",
        borderColor: "#5E60CE",
    },
    taskDetails: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
    titleCompleted: {
        textDecorationLine: "line-through",
        color: "#6B6B6B",
    },
    description: {
        fontSize: 14,
        color: "#A9A9A9",
    },
    alarmText: {
        color: "#FFD700",
        fontSize: 14,
        marginTop: 4,
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 5,
        backgroundColor: "#E23C44",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
    },
});
