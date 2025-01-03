import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1F1E25',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    nameCompleted: {
        textDecorationLine: 'line-through',
        color: '#6B6B6B',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#555',
        borderRadius: 4,
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#007BFF',
    },
    name: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        marginLeft: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 24
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 5,
        backgroundColor: '#E23C44',
        alignItems: 'center',
        justifyContent: 'center'
    },
})