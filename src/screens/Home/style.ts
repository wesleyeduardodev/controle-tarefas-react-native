import {StyleSheet} from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131016",
        padding: 20,
    },
    addButton: {
        backgroundColor: "#317bcf",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20,
        padding: 12,
        marginBottom: 16,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    taskInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    infoBlock: {
        alignItems: "center",
        flex: 1,
    },
    infoBlockActive: {
        backgroundColor: "#cad3e4",
        borderRadius: 8,
        padding: 8,
    },
    labelCreated: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4EA8DE",
    },
    labelPending: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#E9A820",
    },
    labelCompleted: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#8284FA",
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
    },
    number: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    listEmptyText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 16,
        marginTop: 32,
    },
});
