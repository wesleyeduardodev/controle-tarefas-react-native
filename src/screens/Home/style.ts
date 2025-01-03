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

    infoLabel: {
        color: '#6B6B6B',
        fontSize: 16,
        fontWeight: 'bold',
    },

    taskInfoContainer: {
        marginBottom: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    createdTasks: {
        color: '#6B6B6B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completedTasks: {
        color: '#6B6B6B',
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
        resizeMode: 'contain',
    },
    listEmptyText: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center'
    }
})