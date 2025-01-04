import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131016',
        padding: 15
    },
    eventName: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 48,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6B6B6B',
        marginBottom: 4,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 30,
        marginVertical: 16,
    },
    icon: {
        marginRight: 8,
        color: '#317bcf',
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#317bcf',
    },
    infoLabel: {
        color: '#6B6B6B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createdTasks: {
        color: '#21af36',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completedTasks: {
        color: '#084ee6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDate: {
        color: '#6B6B6B',
        fontSize: 16,
        textAlign: 'center'
    },
    input: {
        flex: 1,
        height: 56,
        backgroundColor: '#1F1E25',
        borderRadius: 5,
        color: '#FFFF',
        padding: 16,
        fontSize: 16,
        marginRight: 12
    },
    buttonText: {
        color: '#FFF',
        fontSize: 24
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 5,
        backgroundColor: '#317bcf',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20
    },
    viewImage: {
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    rocket: {
        alignSelf: "center",
        marginVertical: 16
    },
    listEmptyText: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center'
    },
    taskInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    infoBlock: {
        alignItems: 'center',
        flex: 1,
    },
    labelCreated: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4EA8DE',
        marginBottom: 4,
    },
    labelPending: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E9A820',
        marginBottom: 4,
    },
    labelCompleted: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8284FA',
        marginBottom: 4,
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
})